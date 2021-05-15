import { MENU } from "./notification.dto";

export enum GRAVITY{
    YELLOW,
    ORANGE,
    RED
};

export enum STATUS{
    ACTIVE,
    CANCEL
}

export interface GeoModel{
    lat:string;
    lon:string;
}

export class FormNotificationModel{
    id:string | null;
    level:GRAVITY;
    text:string;
    geo:GeoModel;
    situation:MENU;
    idUser:string | null;    
    constructor(){};


}