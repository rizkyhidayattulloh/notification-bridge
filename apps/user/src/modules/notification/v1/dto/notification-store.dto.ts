import { IsNotEmpty, IsString } from 'class-validator';
import { IsUnique } from 'common/decorators/validator.decorator';
import { Notification } from 'modules/notification/notification.entity';
import { Project } from 'modules/project/project.entity';

export class NotificationStore {
    project: Project;

    @IsNotEmpty()
    @IsUnique(Notification, 'identifier')
    @IsString()
    identifier: string;

    @IsNotEmpty()
    url: string;

    @IsNotEmpty()
    type: string;
}
