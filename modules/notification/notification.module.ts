import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationLogModule } from 'modules/notification-log/notification-log.module';
import { Notification } from './notification.entity';
import { NotificationService } from './notification.service';

@Module({
    imports: [TypeOrmModule.forFeature([Notification]), NotificationLogModule],
    providers: [NotificationService],
    exports: [NotificationService]
})
export class NotificationModule {}
