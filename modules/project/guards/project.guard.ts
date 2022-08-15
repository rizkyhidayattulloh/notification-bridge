import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable
} from '@nestjs/common';
import { Request } from 'express';
import { User } from 'modules/user/user.entity';
import { ProjectService } from '../project.service';

@Injectable()
export class ProjectGuard implements CanActivate {
    constructor(
        @Inject(ProjectService) private projectService: ProjectService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();

        const project = await this.projectService.findProject(
            request.user as User,
            request.params['projectId']
        );

        return project ? true : false;
    }
}
