import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from 'modules/user/user.entity';
import { UserService } from 'modules/user/user.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IJwtPayload } from '../interfaces/jwt-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({
            secretOrKey: new ConfigService().get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false
        });
    }

    async validate(payload: IJwtPayload): Promise<User> {
        const { id, username } = payload;

        const user = await this.userService.findByColumns(
            {
                column: 'id',
                value: id
            },
            {
                column: 'username',
                value: username
            }
        );

        if (!user) throw new UnauthorizedException();

        return user;
    }
}
