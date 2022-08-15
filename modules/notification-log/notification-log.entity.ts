import { AbstractEntity } from 'common/abstract/abstract.entity';
import { Notification } from 'modules/notification/notification.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('notification_logs')
export class NotificationLog extends AbstractEntity {
    @ManyToOne(() => Notification, (notification) => notification.logs)
    @JoinColumn({ name: 'notification_id' })
    notification: Notification;

    @Column()
    data: string;

    @Column({ name: 'send_at', type: 'timestamp', nullable: true })
    sendAt: Date;
}
