import Jwt, { decode } from "jsonwebtoken"
import {redisInstance, redisKey} from './redis.utils';
import createError from 'http-errors';
async function signToken(userId){ 
    // token options   
    const options = {
        expiresIn:"24h",
        issuer:process.env.DOMAIN,
        audience:userId
    }

    const payload = {};

    // sign token with payload and options
    const token = await Jwt.sign(payload,process.env.SECRET_TOKEN,options);

    // save session token on redis (with seconds expire - 24h)
    await redisInstance.set(redisKey('session',userId),token,'EX',24*60*60);    

    return token;
}

async function removeToken(userId){
    // remove token on redis
    let result = await redisInstance.del(redisKey('session',userId));
    
    return result;
}

async function verifyToken(token){

    // verify token
    const decoded = await Jwt.verify(token,process.env.SECRET_TOKEN);   
    console.log(token,decoded);
    // verify if exists on db
    const result = await redisInstance.get(redisKey('session',decoded.aud));

    if(!result) throw createError.Unauthorized();
        

    return decoded;
}

export {
    signToken,
    verifyToken,
    removeToken
}