import { Injectable } from '@nestjs/common';
import { Project } from 'modules/project/project.entity';
import { ProjectService as SProjectService } from 'modules/project/project.service';
import { ContextProvider } from 'providers/context.provider';
import { ProjectStore } from './dto/project-store.dto';

@Injectable()
export class ProjectService {
    constructor(private readonly service: SProjectService) {}

    async index(): Promise<Project[]> {
        const projects = this.service.getProjects(
            ContextProvider.getAuthUser()
        );

        return projects;
    }

    async store(body: ProjectStore): Promise<object> {
        await this.service.store(body);

        return {};
    }
}
