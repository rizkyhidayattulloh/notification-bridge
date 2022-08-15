import { Module } from '@nestjs/common';
import { ProjectModule as MProjectModule } from 'modules/project/project.module';
import { ProjectController as V1Controller } from './v1/project.controller';
import { ProjectService as V1Service } from './v1/project.service';

@Module({
    imports: [MProjectModule],
    controllers: [V1Controller],
    providers: [V1Service]
})
export class ProjectModule {}
