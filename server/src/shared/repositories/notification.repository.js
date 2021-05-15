import { NotificationModel } from "../models/notification.model";
import { createNotificationsIndex, indexNameNotifications } from "../utils/redis.init.utils";
import { redisKey,convertToUnix, redisInstance, redisOnlyPrefix, xrangeTransformResult } from "../utils/redis.utils";



export default class NotificationRepository{

    async save(data){        
        const prefix = 'notifications';
        console.log("SAVEDATA",process.env.REDIS_KEY);
        const pipeline = await redisInstance.pipeline();
        pipeline.hset(`${redisKey(prefix,data.id)}`,{userId:data.userId,level:data.level,text:data.text,situation:data.situation, geo:`${data.lon},${data.lat}`},'EX',48*60*60)
        
        //48 hours
        pipeline.call('EXPIRE',`${redisKey(prefix,data.id)}`,172800);

        let result = await pipeline.exec();
        await createNotificationsIndex();
        console.log(result);        
        return result;
    } 

    async attendCancel(id){
        const prefix = 'notifications';
        const result = await redisInstance.hdel(`${redisKey(prefix,id)}`,'userOrg','dateAttention');
        console.log(result);
        return result;
    }

    async attendNotification(data){
        const prefix = 'notifications';
        // save hash by 48h
        const result = await redisInstance.hset(`${redisKey(prefix,data.id)}`,{userId:data.userId,level:data.level,situation:data.situation, geo:`${data.lon},${data.lat}`,userOrg:data.userOrg, dateAttention:new Date()})
        console.log(result);
        return result;
    }

    async removeNotification(data){
        const prefix = 'notifications';
    
        const result = await redisInstance.del(`${data.id}`)
        console.log(result);
        return result;
    }

    async getAll(minLimit,maxLimit){    
        // search all with limit
        const result = await redisInstance.call('FT.SEARCH',indexNameNotifications,'*','LIMIT',minLimit,maxLimit);

        return result;
    }

    async getAllByUser(email,minLimit,maxLimit){    
        
        const emailAddress = email.replace(/\./g, '\\.').replace(/\@/g, '\\@');            
        console.log(`FT.SEARCH',${indexNameNotifications},@userId:{${emailAddress}},'LIMIT',${minLimit},${maxLimit}`);
        // search all with limit
        const result = await redisInstance.call('FT.SEARCH',indexNameNotifications,`@userId:{${emailAddress}}`,'LIMIT',minLimit,maxLimit);
        console.log("result=>",result);
        return result;
    }

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
        _dataNotification.text = dataNotification.text;        
        
        // create stream with notification data
        const result = await redisInstance.xadd(STREAM_NAME,'MAXLEN',30, "*",'userId',_dataNotification.userId,'level',_dataNotification.level,'situation',_dataNotification.situation,'lat',_dataNotification.geo.lat,'lon',_dataNotification.geo.lon, 'text',_dataNotification.text);

        return result;

    }

    async listStream(dateInit, dateEnd){                
        let STREAM_NAME = redisOnlyPrefix('report');
        
        const result = await redisInstance.xrange(STREAM_NAME,convertToUnix(dateInit),convertToUnix(dateEnd));
        console.log(xrangeTransformResult(result));
        return xrangeTransformResult(result);
    }


    async getOneStream(id){                
        let STREAM_NAME = redisOnlyPrefix('report');
        console.log(convertToUnix(dateInit),convertToUnix(dateEnd));
        const result = await redisInstance.xrange(STREAM_NAME,id,'LIMIT',1);
        console.log(xrangeTransformResult(result));
        return xrangeTransformResult(result);
    }

    async getNear(lon, lat){                
        console.log(`'FT.SEARCH',${indexNameNotifications},@geo:[${lon} ${lat} 15 m]`);
        // search all with limit
        const result = await redisInstance.call('FT.SEARCH',indexNameNotifications,`@geo:[${lon} ${lat} 15 m]`);

        return result;
    }    
    
}