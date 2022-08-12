import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from 'apps/admin/src/admin.service';
import { Admin } from './admin.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Admin])],
    providers: [AdminService]
})
export class AdminModule {}
