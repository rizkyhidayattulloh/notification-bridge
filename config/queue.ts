import { BullModuleOptions } from '@nestjs/bull';
import { registerAs } from '@nestjs/config';

export default registerAs('queue', (): BullModuleOptions => {
    return {
        redis: {
            host: process.env.REDIS_HOST,
            port: +process.env.REDIS_PORT
        }
    };
});
