"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrganizationServiceInit = OrganizationServiceInit;

var _service = _interopRequireDefault(require("./service"));

var _http = _interopRequireDefault(require("http"));

var _server = require("../shared/utils/server.utils");

function OrganizationServiceInit() {
  var port = (0, _server.normalizePort)(process.env.PORT_ORGANIZATION || '3002');

  _service["default"].set('port', port);

  var server = _http["default"].createServer(_service["default"]);

  server.listen(port);
  server.on('error', (0, _server.onInitError)(server));
  server.on('listening', (0, _server.onInitListenSuccess)('organization-service'));
}

OrganizationServiceInit();