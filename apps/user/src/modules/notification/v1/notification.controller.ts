import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { Auth } from 'common/decorators/auth.decorator';
import { AddParamToBody } from 'common/decorators/param.decorator';
import { TransformDataInterceptor } from 'common/interceptors/transform-data.interceptor';
import { Notification } from 'modules/notification/notification.entity';
import { ProjectGuard } from 'modules/project/guards/project.guard';
import { User } from 'modules/user/user.entity';
import { NotificationStore } from './dto/notification-store.dto';
import { NotificationService } from './notification.service';

@Auth<User>()
@Controller({
    path: 'projects/:projectId/notifications',
    version: '1'
})
export class NotificationController {
    constructor(private service: NotificationService) {}

    @Get()
    @UseGuards(ProjectGuard)
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(TransformDataInterceptor)
    index(@Param('projectId') projectId: string): Promise<Notification[]> {
        return this.service.index(projectId);
    }

    @Post()
    @UseInterceptors(TransformDataInterceptor)
    store(
        @Param('projectId') projectId: string,
        @Body() body: NotificationStore
    ) {
        return this.service.store(projectId, body);
    }
}
