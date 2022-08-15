import { Process, Processor } from '@nestjs/bull';
import { InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Storage } from '@squareboat/nest-storage';
import axios from 'axios';
import { Job } from 'bull';
import { now } from 'common/util';
import { Repository } from 'typeorm';
import { NotificationLog } from './notification-log.entity';

@Processor({ name: 'notificationLog' })
export class NotificationLogProcessor {
    constructor(
        @InjectRepository(NotificationLog)
        private notificationLogRepository: Repository<NotificationLog>
    ) {}

    @Process()
    async execute(job: Job<NotificationLog>): Promise<void> {
        const { data } = job;
        const content = (
            await Storage.disk('notificationLog').get(data.data)
        ).toString('utf-8');

        await axios.post(data.notification.url, JSON.parse(content));

        try {
            await this.notificationLogRepository.update(
                { id: data.id },
                {
                    sendAt: now()
                }
            );
        } catch (e) {
            throw new InternalServerErrorException();
        }
    }
}
