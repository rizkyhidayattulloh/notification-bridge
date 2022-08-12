import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest } from './dto/login.dto';
import { ILoginResponse } from './interfaces/login.response';

@Controller({
    path: 'auth',
    version: '1'
})
export class AuthController {
    constructor(private service: AuthService) {}

    @HttpCode(200)
    @Post('login')
    login(@Body() data: LoginRequest): Promise<ILoginResponse> {
        return this.service.login(data);
    }
}
