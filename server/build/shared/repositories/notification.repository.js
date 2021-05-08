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

var _notification = require("../models/notification.model");

var _redis = require("../utils/redis.utils");

var NotificationRepository = /*#__PURE__*/function () {
  function NotificationRepository() {
    (0, _classCallCheck2["default"])(this, NotificationRepository);
  }

  (0, _createClass2["default"])(NotificationRepository, [{
    key: "addStream",
    value: function () {
      var _addStream = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(dataNotification) {
        var _dataNotification, result;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _dataNotification = new _notification.NotificationModel();
                _dataNotification.geo = {
                  lat: dataNotification.geo.lat,
                  lon: dataNotification.geo.lon
                };
                _dataNotification.idUser = dataNotification.idUser;
                _dataNotification.level = dataNotification.level;
                _dataNotification.situation = dataNotification.situation;
                _context.next = 7;
                return _redis.redisInstance.xadd(STREAM_NAME, 'MAXLEN', 2, "*", idUser, _dataNotification.idUser, level, _dataNotification.level, situation, _dataNotification.situation, lat, _dataNotification.geo.lat, 'lon', _dataNotification.geo.lon);

              case 7:
                result = _context.sent;
                console.log("stream=>", result);
                return _context.abrupt("return", result);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function addStream(_x) {
        return _addStream.apply(this, arguments);
      }

      return addStream;
    }()
  }]);
  return NotificationRepository;
}();

exports["default"] = NotificationRepository;
(0, _defineProperty2["default"])(NotificationRepository, "STREAM_NAME", (0, _redis.redisOnlyPrefix)('report'));