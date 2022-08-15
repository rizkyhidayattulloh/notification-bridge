import { Module } from '@nestjs/common';
import { NotificationModule as MNotificationModule } from 'modules/notification/notification.module';
import { ProjectModule } from 'modules/project/project.module';
import { NotificationController as V1Controller } from './v1/notification.controller';
import { NotificationService as V1Service } from './v1/notification.service';

@Module({
    imports: [MNotificationModule, ProjectModule],
    controllers: [V1Controller],
    providers: [V1Service]
})
export class NotificationModule {}
