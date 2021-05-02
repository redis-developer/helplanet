import { MENU } from "../home/menu/menu.component";

export enum GRAVITY{
    YELLOW,
    ORANGE,
    RED
};
export interface FormNotificationModel{
    level:GRAVITY,
    text:string,
    geo:{lat:string,lon:string},
    situation:MENU,
    idUser:string
}