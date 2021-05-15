"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _notification = _interopRequireDefault(require("../../shared/repositories/notification.repository"));

var _socket = _interopRequireDefault(require("../../shared/repositories/socket.service"));

var NotificationController = _interopRequireWildcard(require("../controllers"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var rediesEvents = function rediesEvents() {//const  notificationPersistence = new NotificationRepository();
  //NotificationController.SaveNotificationCtrl(notificationPersistence)();
};

var ioEvents = function ioEvents(io) {//const  notificationPersistence = new NotificationRepository();
  //const ioSocketService = new SocketService(io);       
  //NotificationController.SendNewReportCtrl(ioSocketService,notificationPersistence)();
};

var _default = {
  ioEvents: ioEvents,
  rediesEvents: rediesEvents
};
exports["default"] = _default;