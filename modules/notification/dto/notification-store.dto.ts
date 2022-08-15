import { Project } from 'modules/project/project.entity';

export class NotificationStore {
    project: Project;
    identifier: string;
    url: string;
    type: string;
}
