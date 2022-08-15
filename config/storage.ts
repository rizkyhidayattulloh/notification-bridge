import { registerAs } from '@nestjs/config';
import { StorageOptions } from '@squareboat/nest-storage';

export default registerAs('storage', (): StorageOptions => {
    return {
        disks: {
            notificationLog: {
                driver: 'local',
                basePath: 'storage/private/notification-log'
            }
        }
    };
});
