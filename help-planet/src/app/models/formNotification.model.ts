import { MENU } from "../home/menu/menu.component";

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
    status:STATUS | null;
    constructor(){};


}