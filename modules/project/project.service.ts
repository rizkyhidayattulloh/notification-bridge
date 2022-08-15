import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'common/abstract/abstract.service';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { User } from 'modules/user/user.entity';
import { ProjectStore } from './dto/project-store.dto';

@Injectable()
export class ProjectService extends AbstractService<Project> {
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>
    ) {
        super(projectRepository, 'project');
    }

    async getProjects(user: User): Promise<Project[]> {
        const query = this.getQuery();

        query.where('project.user_id = :userId', { userId: user.id });

        return this.setQuery(query).get();
    }

    async findProject(user: User, projectId: string): Promise<Project> {
        const query = this.getQuery();

        query.where('project.user_id = :userId AND project.id = :projectId', {
            userId: user.id,
            projectId
        });

        return this.setQuery(query).find();
    }

    async store(data: ProjectStore): Promise<void> {
        const project = this.projectRepository.create(data);

        try {
            await this.projectRepository.save(project);
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}
