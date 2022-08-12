import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hashCheck } from 'common/util';
import { UserService } from 'modules/user/user.service';
import { LoginRequest } from './dto/login.dto';
import { ILoginResponse } from './interfaces/login.response';
import { IJwtPayload } from './interfaces/jwt-payload';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async login(data: LoginRequest): Promise<ILoginResponse> {
        const { username, password } = data;
        const user = await this.userService.findByColumns({
            column: 'username',
            value: username
        });

        if (!user) throw new BadRequestException('invalid credential');

        const isValidCredential = await hashCheck(password, user.password);

        if (!isValidCredential)
            throw new BadRequestException('invalid credential');

        const payload: IJwtPayload = { id: user.id, username: user.username };

        const accessToken = this.jwtService.sign(payload);

        return { accessToken };
    }
}
