"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SessionServiceInit = SessionServiceInit;

var _service = _interopRequireDefault(require("./service"));

var _http = _interopRequireDefault(require("http"));

var _server = require("../shared/utils/server.utils");

function SessionServiceInit() {
  var port = (0, _server.normalizePort)(process.env.PORT_SESSION || '3001');

  _service["default"].set('port', port);

  var server = _http["default"].createServer(_service["default"]);

  server.listen(port);
  server.on('error', (0, _server.onInitError)(server));
  server.on('listening', (0, _server.onInitListenSuccess)('session-service'));
}

SessionServiceInit();