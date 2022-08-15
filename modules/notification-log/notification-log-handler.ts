import { Storage } from '@squareboat/nest-storage';
import { v4 as uuidV4 } from 'uuid';

export class NotificationLogHandler {
    private fileName: string;

    constructor(private data: string) {
        const fileName = `${uuidV4()}.json`;

        this.fileName = fileName;

        this.build();
    }

    private async build(): Promise<void> {
        await Storage.disk('notificationLog').put(this.fileName, this.data);
    }

    getFileName(): string {
        return this.fileName;
    }
}
