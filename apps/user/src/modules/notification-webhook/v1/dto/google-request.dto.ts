import { IsNotEmpty, IsObject } from 'class-validator';

export class GoogleRequest {
    @IsNotEmpty()
    @IsObject()
    message: {
        data: string;
    };
}
