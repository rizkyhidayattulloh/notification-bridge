import { InjectQueue } from '@nestjs/bull';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { AbstractService } from 'common/abstract/abstract.service';
import { Repository } from 'typeorm';
import { NotificationLogStore } from './dto/notification-log-store.dto';
import { NotificationLogHandler } from './notification-log-handler';
import { NotificationLog } from './notification-log.entity';

@Injectable()
export class NotificationLogService extends AbstractService<NotificationLog> {
    constructor(
        @InjectRepository(NotificationLog)
        private notificationLogRepository: Repository<NotificationLog>,
        @InjectQueue('notificationLog')
        private notificationLogQueue: Queue
    ) {
        super(notificationLogRepository, 'notificationLog');
    }

    async store(data: NotificationLogStore): Promise<void> {
        const { notification } = data;
        const fileName = new NotificationLogHandler(data.data).getFileName();
        const notificationLog = this.notificationLogRepository.create({
            notification,
            data: fileName
        });

        try {
            await this.notificationLogRepository.save(notificationLog);

            await this.sendNotification(notificationLog);
        } catch (e) {
            throw new InternalServerErrorException();
        }
    }

    private async sendNotification(
        notificationLog: NotificationLog
    ): Promise<void> {
        await this.notificationLogQueue.add(notificationLog);
    }
}
