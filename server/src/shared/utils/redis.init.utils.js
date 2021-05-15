import { redisInstance, redisPrefix } from "./redis.utils";

export const indexNameUsers = "usersIdx";
export const indexNameNotifications = "notificationsIdx";

export async function createUsersIndex(){
    const pipeline = redisInstance.pipeline();    
    pipeline.call('FT.DROPINDEX',indexNameUsers);        

    // FT.CREATE usersIdx ON HASH PREFIX 1 hpa:users: SCHEMA username TEXT password TEXT email TAG status NUMERIC role NUMERIC
    pipeline.call('FT.CREATE',indexNameUsers,'ON','HASH','PREFIX','1',redisPrefix('users'),'SCHEMA','username','TEXT','password','TEXT','email','TAG','status','NUMERIC','role','NUMERIC')    

    const result = await pipeline.exec();

    if(result.length === 2 && result[1][1] === 'OK'){
        console.log("Index created");
    }else{        
        console.log("Error creating index", result);
    }
};

export async function createNotificationsIndex(){
    const pipeline = redisInstance.pipeline();           
    pipeline.call('FT.DROPINDEX',indexNameNotifications);    

    // FT.CREATE attentionsIdx ON HASH PREFIX 1 hpa:attentions: SCHEMA geo GEO
    pipeline.call('FT.CREATE',indexNameNotifications,'ON','HASH','PREFIX','1',redisPrefix('notifications'),'SCHEMA','geo','GEO', 'userId','TAG', 'userOrg','TAG')    

    const result = await pipeline.exec();

    if(result.length === 2 && result[1][1] === 'OK'){
        console.log("Index created");
    }else{        
        console.log("Error creating index", result);
    }
};

createUsersIndex();
createNotificationsIndex();

