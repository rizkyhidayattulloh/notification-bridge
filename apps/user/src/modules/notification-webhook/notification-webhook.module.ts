import { Module } from '@nestjs/common';
import { NotificationLogModule } from 'modules/notification-log/notification-log.module';
import { NotificationModule } from 'modules/notification/notification.module';
import { NotificationWebhookController as V1Controller } from './v1/notification-webhook.controller';
import { NotificationWebhookService as V1Service } from './v1/notification-webhook.service';

@Module({
    imports: [NotificationModule, NotificationLogModule],
    controllers: [V1Controller],
    providers: [V1Service]
})
export class NotificationWebhookModule {}
