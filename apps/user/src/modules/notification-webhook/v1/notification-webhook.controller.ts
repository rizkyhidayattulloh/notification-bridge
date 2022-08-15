import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { GoogleRequest } from './dto/google-request.dto';
import { NotificationWebhookService } from './notification-webhook.service';

@Controller({
    path: 'notification-webhook',
    version: '1'
})
export class NotificationWebhookController {
    constructor(private service: NotificationWebhookService) {}

    @Post('google')
    @HttpCode(HttpStatus.OK)
    google(@Body() body: GoogleRequest) {
        return this.service.google(body);
    }
}
