import {
    HttpException,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
    UnprocessableEntityException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'common/abstract/abstract.service';
import { Project } from 'modules/project/project.entity';
import { Repository } from 'typeorm';
import { NotificationStore } from './dto/notification-store.dto';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationService extends AbstractService<Notification> {
    constructor(
        @InjectRepository(Notification)
        private notificationRepository: Repository<Notification>
    ) {
        super(notificationRepository, 'notification');
    }

    async getNotifications(project: Project): Promise<Notification[]> {
        const query = this.getQuery();

        query.where('notification.project_id = :projectId', {
            projectId: project.id
        });

        return this.setQuery(query).get();
    }

    async store(data: NotificationStore): Promise<void> {
        const { project } = data;

        if (!data.url.includes(project.domain)) {
            throw new HttpException(
                'url invalid',
                HttpStatus.UNPROCESSABLE_ENTITY
            );
        }

        const notification = this.notificationRepository.create(data);

        try {
            await this.notificationRepository.save(notification);
        } catch (e) {
            throw new InternalServerErrorException();
        }
    }
}
