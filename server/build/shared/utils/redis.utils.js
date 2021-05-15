"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertToUnix = exports.xrangeTransformResult = exports.redisOnlyPrefix = exports.redisPrefix = exports.redisKey = exports.redisInstance = void 0;

// redis init
var Redis = require("ioredis");

var redisInstance = new Redis({
  port: process.env.REDIS_PORT,
  path: process.env.REDIS_PATH,
  password: process.env.REDIS_PASS,
  retryStrategy: function retryStrategy(times) {
    var delay = Math.min(times * 50, 2000);
    return delay;
  }
}); // return key format for redis db

exports.redisInstance = redisInstance;

var redisKey = function redisKey(prefix, val) {
  return "".concat(process.env.REDIS_KEY, ":").concat(prefix, ":").concat(val);
}; // return only prefix key


exports.redisKey = redisKey;

var redisPrefix = function redisPrefix(prefix) {
  return "".concat(process.env.REDIS_KEY, ":").concat(prefix, ":");
}; // return only prefix 


exports.redisPrefix = redisPrefix;

var redisOnlyPrefix = function redisOnlyPrefix(prefix) {
  return "".concat(process.env.REDIS_KEY, ":").concat(prefix);
}; // ************************ TRANSFORMER HSET***********************


exports.redisOnlyPrefix = redisOnlyPrefix;
Redis.Command.setArgumentTransformer('hset', function (args) {
  if (args.length === 2) {
    var argArray = [];
    argArray.push(args[0]); //key name
    // Transform object into array of field name then value.

    var fieldNameValuePairs = args[1];

    for (var fieldName in fieldNameValuePairs) {
      argArray.push(fieldName, fieldNameValuePairs[fieldName]);
    }

    return argArray;
  }

  return args;
});
Redis.Command.setReplyTransformer("hgetall", function (result) {
  if (Array.isArray(result)) {
    var obj = {};

    for (var i = 0; i < result.length; i += 2) {
      obj[result[i]] = result[i + 1];
    }

    return obj;
  }

  return result;
}); // ************************ TRANSFORMER REDIS SEARCH***********************

Redis.Command.setReplyTransformer("FT.SEARCH", function (result) {
  if (Array.isArray(result)) {
    var objResult = []; // loop all array skip id and result num

    for (var i = 2; i < result.length; i += 2) {
      // loop by results obj
      var obj = {};

      for (var j = 0; j < result[i].length; j += 2) {
        // create obj sesult
        obj[result[i][j]] = result[i][j + 1];
      }

      objResult.push(obj);
    }

    return objResult;
  }

  return result;
}); // ************************ TRANSFORMER REDIS XRANGE***********************

var xrangeTransformResult = function xrangeTransformResult(result) {
  if (Array.isArray(result)) {
    var objResult = []; // loop all array skip id and result num

    for (var i = 0; i < result.length; i += 1) {
      // loop by results obj
      var obj = {};
      obj['id'] = result[i][0];

      for (var j = 0; j < result[i][1].length; j += 2) {
        // create obj sesult
        obj[result[i][1][j]] = result[i][1][j + 1];
      }

      objResult.push(obj);
    }

    return objResult;
  }

  return result;
};

exports.xrangeTransformResult = xrangeTransformResult;

var convertToUnix = function convertToUnix(date) {
  return Math.floor(new Date(date).getTime());
};

exports.convertToUnix = convertToUnix;