import { GeoModel, GRAVITY } from "./formNotification.model";

export enum MENU{
    animal = 'animal',
    contamination = 'contamination',
    garbage = 'garbage',
    delinquency = 'delinquency'
}


export class NotificationDTO{
    id:string | null;
    level:GRAVITY;
    text:string;
    geo:string;
    situation:MENU;
    userId:string;
    userOrg:string | null; 
    lat:string | null;   
    lon:string | null;
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