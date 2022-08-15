import { Exclude } from 'class-transformer';
import { AbstractEntity } from 'common/abstract/abstract.entity';
import { Project } from 'modules/project/project.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('users')
export class User extends AbstractEntity {
    @Column()
    name: string;

    @Column({ unique: true })
    username: string;

    @Column()
    @Exclude()
    password: string;

    @OneToMany(() => Project, (project) => project.user)
    projects: Project[];
}
