import { NotificationModel } from "../models/notification.model";
import { redisInstance, redisOnlyPrefix } from "../utils/redis.utils";

export default class NotificationRepository{
     
    async addStream(dataNotification){
        // stream name with db name
        let STREAM_NAME = redisOnlyPrefix('report');        
        // new notification
        const _dataNotification = new NotificationModel();
        _dataNotification.geo = {
            lat:dataNotification.geo.lat,
            lon:dataNotification.geo.lon,
        }
        _dataNotification.userId = dataNotification.userId;
        _dataNotification.level = dataNotification.level;
        _dataNotification.situation = dataNotification.situation;        
        
        // create stream with notification data
        const result = await redisInstance.xadd(STREAM_NAME,'MAXLEN',2, "*",'userId',_dataNotification.userId,'level',_dataNotification.level,'situation',_dataNotification.situation,'lat',_dataNotification.geo.lat,'lon',_dataNotification.geo.lon);

        // print stream id
        console.log("stream=>",result);

        return result;

    }
}