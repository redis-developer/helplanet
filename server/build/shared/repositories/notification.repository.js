"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _notification = require("../models/notification.model");

var _redis = require("../utils/redis.utils");

//import { createNotificationsIndex, indexNameNotifications } from "../utils/redis.init.utils";
var prefix = 'notifications';

var NotificationRepository = /*#__PURE__*/function () {
  function NotificationRepository() {
    (0, _classCallCheck2["default"])(this, NotificationRepository);
  }

  (0, _createClass2["default"])(NotificationRepository, [{
    key: "listenStream",
    value: // async save(data){
    //     const result = await redisInstance.hset(`${redisKey(prefix,data.id)}`,{userId:data.userId,level:data.level,situation:data.situation, geo:`${data.lon},${data.lat}`},'EX',48*60*60)
    //     await createNotificationsIndex();
    //     console.log(result);        
    //     return result;
    // } 
    // async attendCancel(id){
    //     const result = await redisInstance.hdel(`${redisKey(prefix,id)}`,'userOrg','dateAttention','EX',48*60*60);
    //     console.log(result);
    //     return result;
    // }
    // async attendNotification(data){
    //     // save hash by 48h
    //     const result = await redisInstance.hset(`${redisKey(prefix,data.id)}`,{userId:data.userId,level:data.level,situation:data.situation, geo:`${data.lon},${data.lat}`,userOrg:data.userOrg, dateAttention:new Date()})
    //     console.log(result);
    //     return result;
    // }
    // async removeNotification(data){
    //     const result = await redisInstance.del(`${redisKey(prefix,data.id)}`)
    //     console.log(result);
    //     return result;
    // }
    // async getAll(minLimit,maxLimit){
    //     // search all with limit
    //     const result = await redisInstance.call('FT.SEARCH',indexNameNotifications,'*','LIMIT',minLimit,maxLimit);
    //     return result;
    // }
    // async addStream(dataNotification){
    //     // stream name with db name
    //     let STREAM_NAME = redisOnlyPrefix('report');        
    //     // new notification
    //     const _dataNotification = new NotificationModel();
    //     _dataNotification.geo = {
    //         lat:dataNotification.geo.lat,
    //         lon:dataNotification.geo.lon,
    //     }
    //     _dataNotification.userId = dataNotification.userId;
    //     _dataNotification.level = dataNotification.level;
    //     _dataNotification.situation = dataNotification.situation;        
    //     // create stream with notification data
    //     const result = await redisInstance.xadd(STREAM_NAME,'MAXLEN',30, "*",'userId',_dataNotification.userId,'level',_dataNotification.level,'situation',_dataNotification.situation,'lat',_dataNotification.geo.lat,'lon',_dataNotification.geo.lon);
    //     // print stream id
    //     //TODO remove console.log("stream=>",result);
    //     return result;
    // }
    // async listStream(dateInit, dateEnd){        
    //     let STREAM_NAME = redisOnlyPrefix('report');
    //     const result = await redisInstance.xrange(STREAM_NAME,convertToUnix(dateInit),convertToUnix(dateEnd));
    //     console.log(xrangeTransformResult(result));
    //     return xrangeTransformResult(result);
    // }
    // async getOneStream(id){        
    //     let STREAM_NAME = redisOnlyPrefix('report');
    //     console.log(convertToUnix(dateInit),convertToUnix(dateEnd));
    //     const result = await redisInstance.xrange(STREAM_NAME,id,'LIMIT',1);
    //     console.log(xrangeTransformResult(result));
    //     return xrangeTransformResult(result);
    // }
    // async getNear(lon, lat){
    //     //TODO eliminar console.log(`FT.SEARCH ${indexNameNotifications} @geo:[${lon} ${lat} 15 m]`);
    //     // search all with limit
    //     const result = await redisInstance.call('FT.SEARCH',indexNameNotifications,`@geo:[${lon} ${lat} 15 m]`);
    //     return result;
    // }
    function () {
      var _listenStream = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(cb) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function listenStream(_x) {
        return _listenStream.apply(this, arguments);
      }

      return listenStream;
    }()
  }]);
  return NotificationRepository;
}();

exports["default"] = NotificationRepository;