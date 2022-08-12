import type {
    CallHandler,
    ExecutionContext,
    NestInterceptor
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ContextProvider } from 'providers/context.provider';

@Injectable()
export class AuthUserInterceptor<Entity> implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) {
        const request = context.switchToHttp().getRequest();

        const user = <Entity>request.user;
        ContextProvider.setAuthUser(user);

        return next.handle();
    }
}
