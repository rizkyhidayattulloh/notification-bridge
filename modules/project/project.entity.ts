import { AbstractEntity } from 'common/abstract/abstract.entity';
import { Notification } from 'modules/notification/notification.entity';
import { User } from 'modules/user/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('projects')
export class Project extends AbstractEntity {
    @ManyToOne(() => User, (user) => user.projects)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => Notification, (notification) => notification.project)
    notifications: Notification[];

    @Column()
    domain: string;

    @Column({ nullable: true })
    note?: string;
}
