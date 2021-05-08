import User from "../models/user.model"
import { createUsersIndex, indexNameUsers } from "../utils/redis.init.utils";
import { redisInstance, redisKey } from "../utils/redis.utils";
const prefix = 'users';
export default class UserRepository{
    async save(user){
        let _user = new User();
        _user = user;              
        let id = _user.email;
        const result = await redisInstance.hset(`${redisKey(prefix,id)}`,_user)                
        await createUsersIndex();        

        return result;
    }    
    
    async getByEmail(email){
        // escape @
        // const emailAddress = email.replace(/\./g, '\\.').replace(/\@/g, '\\@');
        const emailAddress = 'byron\\@hotmail\\.com';
        
        // search by email on redis
        const result = await redisInstance.call('FT.SEARCH',indexNameUsers,`@email:{${emailAddress}}`);
        

        return result;

    }

    async getById(id){
        console.log("KEY",redisKey('users',id));
        // search by id on redis
        const result = await redisInstance.hgetall(redisKey('users',id));

        console.log(result);

        return result;   
    }
}