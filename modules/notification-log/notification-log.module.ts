import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationLog } from './notification-log.entity';
import { NotificationLogProcessor } from './notification-log.processor';
import { NotificationLogService } from './notification-log.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([NotificationLog]),
        BullModule.registerQueue({ name: 'notificationLog' })
    ],
    providers: [NotificationLogService, NotificationLogProcessor],
    exports: [NotificationLogService]
})
export class NotificationLogModule {}
