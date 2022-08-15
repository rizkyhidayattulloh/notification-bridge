import { Injectable } from '@nestjs/common';
import { NotificationLogService } from 'modules/notification-log/notification-log.service';
import { NotificationService } from 'modules/notification/notification.service';
import { GoogleWebhook } from '../webhook/google.webhook';
import { GoogleRequest } from './dto/google-request.dto';

@Injectable()
export class NotificationWebhookService {
    constructor(
        private notificationService: NotificationService,
        private notificationLogService: NotificationLogService
    ) {}

    async google(body: GoogleRequest) {
        const buff = Buffer.from(body.message.data, 'base64');
        const data = JSON.parse(buff.toString('utf-8'));

        const google = new GoogleWebhook(data);

        const notification = await this.notificationService.findByColumns({
            column: 'identifier',
            value: google.getUniqueIdentifier()
        });

        if (notification) {
            await this.notificationLogService.store({
                notification,
                data: JSON.stringify(google)
            });
        }
    }
}
