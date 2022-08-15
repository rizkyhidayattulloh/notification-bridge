import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidatorModule } from 'common/validators/validator.module';
import { config } from 'config';
import { AuthModule } from './auth/auth.module';
import { NotificationWebhookModule } from './notification-webhook/notification-webhook.module';
import { NotificationModule } from './notification/notification.module';
import { ProjectModule } from './project/project.module';
import { StorageModule } from '@squareboat/nest-storage';
import { BullModule } from '@nestjs/bull';

const modules = [
    AuthModule,
    ProjectModule,
    NotificationModule,
    NotificationWebhookModule
];

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: config
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) =>
                configService.get('database')
        }),
        ThrottlerModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) =>
                configService.get('throttler')
        }),
        StorageModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) =>
                configService.get('storage')
        }),
        BullModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) =>
                configService.get('queue')
        }),
        ValidatorModule,
        ...modules
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        }
    ]
})
export class AppModule {}
