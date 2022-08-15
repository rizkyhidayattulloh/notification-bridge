import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    UseInterceptors
} from '@nestjs/common';
import { Auth } from 'common/decorators/auth.decorator';
import { AddParamToBody } from 'common/decorators/param.decorator';
import { TransformDataInterceptor } from 'common/interceptors/transform-data.interceptor';
import { Project } from 'modules/project/project.entity';
import { User } from 'modules/user/user.entity';
import { ContextProvider } from 'providers/context.provider';
import { ProjectStore } from './dto/project-store.dto';
import { ProjectService } from './project.service';

@Auth<User>()
@Controller({
    path: 'projects',
    version: '1'
})
export class ProjectController {
    constructor(private readonly service: ProjectService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(TransformDataInterceptor)
    index(): Promise<Project[]> {
        return this.service.index();
    }

    @Post()
    @UseInterceptors(TransformDataInterceptor)
    store(
        @AddParamToBody([
            {
                name: 'user',
                value: () => ContextProvider.getAuthUser()
            }
        ])
        @Body()
        body: ProjectStore
    ): Promise<object> {
        return this.service.store(body);
    }
}
