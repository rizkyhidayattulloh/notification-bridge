import { AbstractEntity } from 'common/abstract/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Admin extends AbstractEntity {
    @Column()
    name: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;
}
