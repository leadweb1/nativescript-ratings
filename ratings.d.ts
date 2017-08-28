declare module "nativescript-ratings" {

    export class Ratings {
        constructor(configuration: IConfiguration);
        init();
        prompt();
        hasRated();
        reset();
    }

    export interface IConfiguration {
        id?: string;
        showNow?: boolean;
        showOnCount?: number;
        title: string;
        text?: string;
        agreeButtonText?: string;
        remindButtonText?: string;
        declineButtonText?: string;
        androidPackageId?: string;
        iTunesAppId?: string;
    }

}
