import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'common/abstract/abstract.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService extends AbstractService<User> {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {
        super(userRepository, 'user');
    }
}
