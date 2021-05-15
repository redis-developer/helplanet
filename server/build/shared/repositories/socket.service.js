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

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

//import { redisInstance, redisKey } from "../utils/redis.utils";
var SocketService = /*#__PURE__*/function () {
  function SocketService(io) {
    (0, _classCallCheck2["default"])(this, SocketService);
    (0, _defineProperty2["default"])(this, "_socket", void 0);
    this._socket = io;
  }

  (0, _createClass2["default"])(SocketService, [{
    key: "sendNewReport",
    value: function () {
      var _sendNewReport = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this._socket.on('connection', function (socket) {
                  console.log('connection - io');
                  socket.emit('new-report', data);
                });

                return _context.abrupt("return");

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function sendNewReport(_x) {
        return _sendNewReport.apply(this, arguments);
      }

      return sendNewReport;
    }()
  }]);
  return SocketService;
}();

exports["default"] = SocketService;