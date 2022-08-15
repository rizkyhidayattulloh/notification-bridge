import { Injectable } from '@nestjs/common';
import { Notification } from 'modules/notification/notification.entity';
import { NotificationService as SNotificationService } from 'modules/notification/notification.service';
import { ProjectService } from 'modules/project/project.service';
import { NotificationStore } from './dto/notification-store.dto';

@Injectable()
export class NotificationService {
    constructor(
        private service: SNotificationService,
        private projectService: ProjectService
    ) {}

    async index(projectId: string): Promise<Notification[]> {
        const project = await this.projectService.findByColumns({
            column: 'id',
            value: projectId
        });

        return this.service.getNotifications(project);
    }

    async store(projectId: string, body: NotificationStore): Promise<object> {
        const project = await this.projectService.findByColumns({
            column: 'id',
            value: projectId
        });

        body.project = project;

        await this.service.store(body);

        return {};
    }
}
