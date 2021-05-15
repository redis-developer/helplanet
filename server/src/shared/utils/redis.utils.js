// redis init
const Redis = require("ioredis");
const redisInstance = new Redis();

// return key format for redis db
const redisKey = (prefix,val)=>{
  console.log("REDIS KEY",prefix+"/"+val);
    return `${process.env.REDIS_KEY}:${prefix}:${val}`;
}

// return only prefix key
const redisPrefix = (prefix)=>{    
  return `${process.env.REDIS_KEY}:${prefix}:`;
}

// return only prefix 
const redisOnlyPrefix = (prefix)=>{      
  return `${process.env.REDIS_KEY}:${prefix}`;
}

// ************************ TRANSFORMER HSET***********************
Redis.Command.setArgumentTransformer('hset', function (args) {
  console.log("length",args.length);
  if (args.length === 2) {
    const argArray = [];

    argArray.push(args[0]); //key name

    // Transform object into array of field name then value.
    const fieldNameValuePairs = args[1];

    for (const fieldName in fieldNameValuePairs) {
      argArray.push(fieldName, fieldNameValuePairs[fieldName]);
    }
    console.log("arg",argArray);
    return argArray;
  }else if(args.length === 4){    
    const argArray = [];

    argArray.push(args[0]); //key name

    // Transform object into array of field name then value.
    const fieldNameValuePairs = args[1];

    for (const fieldName in fieldNameValuePairs) {
      argArray.push(fieldName, fieldNameValuePairs[fieldName]);
    }

    argArray.push(args[2]);
    argArray.push(args[3]);

    console.log("return args",argArray);
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
  console.log(result);
  if (Array.isArray(result)) {
    const objResult = [];
    // loop all array skip id and result num
    for (let i = 2; i < result.length; i += 2) {
      // loop by results obj
      let obj = {};
      obj['id']=result[i-1];
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


// ************************ TRANSFORMER REDIS XRANGE***********************
const xrangeTransformResult =  (result) => {    
  if (Array.isArray(result)) {
    const objResult = [];
    // loop all array skip id and result num
    for (let i = 0; i < result.length; i += 1) {
      // loop by results obj
      let obj = {};
      obj['id'] = result[i][0];
      for (let j = 0; j < result[i][1].length; j+=2) {                
        // create obj sesult
        obj[result[i][1][j]] = result[i][1][j + 1];        
      }      
      
      objResult.push(obj);
    }
    return objResult;
  }
  return result;
};

// ************************ TRANSFORMER REDIS XREAD***********************
const xreadTransformResult =  (data) => {    
  const result =  data[0][1];
  if (Array.isArray(result)) {
    const objResult = [];
    // loop all array skip id and result num
    for (let i = 0; i < result.length; i += 1) {
      // loop by results obj
      let obj = {};
      obj['id'] = result[i][0];
      for (let j = 0; j < result[i][1].length; j+=2) {                
        // create obj sesult
        obj[result[i][1][j]] = result[i][1][j + 1];        
      }      
      
      objResult.push(obj);
    }
    return objResult;
  }
  return result;
};


const convertToUnix = (date) =>{
  return Math.floor(new Date(date).getTime());
}

export {
    redisInstance,
    redisKey,
    redisPrefix,
    redisOnlyPrefix,
    xrangeTransformResult,
    xreadTransformResult,
    convertToUnix
};