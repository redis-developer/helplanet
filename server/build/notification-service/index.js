"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotificationServiceInit = NotificationServiceInit;

var _service = _interopRequireDefault(require("./service"));

var evNotification = _interopRequireWildcard(require("./routes/notification.route"));

var _socket = _interopRequireDefault(require("socket.io"));

var _http = _interopRequireDefault(require("http"));

var _server = require("../shared/utils/server.utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function NotificationServiceInit() {
  var port = (0, _server.normalizePort)(process.env.PORT_NOTIFICATION || '3006');

  _service["default"].set('port', port);

  var server = _http["default"].createServer(_service["default"]); //io app


  var io = (0, _socket["default"])(server); // io events
  //evNotification.default.ioEvents(io);
  //evNotification.default.rediesEvents();

  server.listen(port);
  server.on('error', (0, _server.onInitError)(server));
  server.on('listening', (0, _server.onInitListenSuccess)('notification-service'));
}

NotificationServiceInit();