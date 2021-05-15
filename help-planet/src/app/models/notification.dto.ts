import { MENU } from "../home/menu/menu.component";
import { GeoModel, GRAVITY } from "./formNotification.model";

export class NotificationDTO{
    id:string | null;
    level:GRAVITY;
    text:string;
    geo:string;
    situation:MENU;
    idUser:string;
    userOrg:string | null;    
    constructor(){};    
    ​​    
    ​​    
    ​​    
    ​​    
        
    convertGeo():GeoModel{
        let geoArr = this.geo.split(',');
        let g:GeoModel = {
            lon:geoArr[0],
            lat:geoArr[1]
        }
        return g;
    }
}