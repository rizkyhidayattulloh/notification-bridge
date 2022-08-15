import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const AddParamToBody = createParamDecorator(
    (args: IAddParamsToBodyArgs[], ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest<Request>();

        args.map((arg) => {
            const { name } = arg;
            const value = Object.is(NaN, parseInt(arg.value()))
                ? arg.value()
                : parseInt(arg.value());

            request.body[name] = value;
        });

        return request;
    }
);

interface IAddParamsToBodyArgs {
    name: string;
    value(): any;
}
