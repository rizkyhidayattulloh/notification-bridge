import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from 'modules/user/user.entity';

export class ProjectStore {
    user: User;

    @IsNotEmpty()
    @IsString()
    domain: string;

    @IsOptional()
    @IsString()
    note?: string;
}
