import { IWebhook } from './webhook.interface';

export class GoogleWebhook implements IWebhook {
    constructor(private data: IGoogleNotificationData) {}

    getUniqueIdentifier(): string {
        return (
            this.data.subscriptionNotification?.purchaseToken ??
            this.data.oneTimeProductNotification?.purchaseToken
        );
    }
}

interface IGoogleNotificationData {
    version: string;
    packageName: string;
    eventTimeMillis: string;
    subscriptionNotification?: {
        version: string;
        notificationType: number;
        purchaseToken: string;
        subscriptionId: string;
    };
    oneTimeProductNotification?: {
        version: string;
        notificationType: number;
        purchaseToken: string;
        subscriptionId: string;
    };
}
