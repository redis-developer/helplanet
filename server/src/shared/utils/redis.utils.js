
// redis init
const Redis = require("ioredis");
const redisInstance = new Redis(
    {
        port:process.env.REDIS_PORT,
        path:process.env.REDIS_PATH,
        password:process.env.REDIS_PASS
    }
);

// return key format for redis db
const redisKey = (prefix,val)=>{
    return `${process.env.REDIS_KEY}:${prefix}:${val}`;
}

// return only prefix key
const redisPrefix = (prefix)=>{    
  return `${process.env.REDIS_KEY}:${prefix}:`;
}
// ************************ TRANSFORMER HSET***********************
Redis.Command.setArgumentTransformer('hset', function (args) {
  if (args.length === 2) {
    const argArray = [];

    argArray.push(args[0]); //key name

    // Transform object into array of field name then value.
    const fieldNameValuePairs = args[1];

    for (const fieldName in fieldNameValuePairs) {
      argArray.push(fieldName, fieldNameValuePairs[fieldName]);
    }

    return argArray;
  }

  return args;
});
Redis.Command.setReplyTransformer("hgetall", (result) => {
    if (Array.isArray(result)) {
      const obj = {};
      for (let i = 0; i < result.length; i += 2) {
        obj[result[i]] = result[i + 1];
      }
      return obj;
    }
    return result;
  });

// ************************ TRANSFORMER REDIS SEARCH***********************
Redis.Command.setReplyTransformer("FT.SEARCH", (result) => {  
  if (Array.isArray(result)) {
    const objResult = [];
    // loop all array skip id and result num
    for (let i = 2; i < result.length; i += 2) {
      // loop by results obj
      let obj = {};
      for (let j = 0; j < result[i].length; j+=2) {                
        // create obj sesult
        obj[result[i][j]] = result[i][j + 1];        
      }      
      
      objResult.push(obj);
    }
    return objResult;
  }
  return result;
});
export {
    redisInstance,
    redisKey,
    redisPrefix
};