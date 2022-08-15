import { AbstractEntity } from 'common/abstract/abstract.entity';
import { NotificationLog } from 'modules/notification-log/notification-log.entity';
import { Project } from 'modules/project/project.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('notifications')
export class Notification extends AbstractEntity {
    @ManyToOne(() => Project, (project) => project.notifications)
    @JoinColumn({ name: 'project_id' })
    project: Project;

    @OneToMany(() => NotificationLog, (log) => log.notification)
    logs: NotificationLog[];

    @Column({ unique: true })
    identifier: string;

    @Column()
    url: string;

    @Column()
    type: string;
}
