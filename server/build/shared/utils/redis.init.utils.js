"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUsersIndex = createUsersIndex;
exports.createNotificationsIndex = createNotificationsIndex;
exports.indexNameNotifications = exports.indexNameUsers = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _redis = require("./redis.utils");

var indexNameUsers = "usersIdx";
exports.indexNameUsers = indexNameUsers;
var indexNameNotifications = "notificationsIdx";
exports.indexNameNotifications = indexNameNotifications;

function createUsersIndex() {
  return _createUsersIndex.apply(this, arguments);
}

function _createUsersIndex() {
  _createUsersIndex = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var pipeline, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            pipeline = _redis.redisInstance.pipeline();
            pipeline.call('FT.DROPINDEX', indexNameUsers); // FT.CREATE usersIdx ON HASH PREFIX 1 hpa:users: SCHEMA username TEXT password TEXT email TAG status NUMERIC role NUMERIC

            pipeline.call('FT.CREATE', indexNameUsers, 'ON', 'HASH', 'PREFIX', '1', (0, _redis.redisPrefix)('users'), 'SCHEMA', 'username', 'TEXT', 'password', 'TEXT', 'email', 'TAG', 'status', 'NUMERIC', 'role', 'NUMERIC');
            _context.next = 5;
            return pipeline.exec();

          case 5:
            result = _context.sent;

            if (result.length === 2 && result[1][1] === 'OK') {
              console.log("Index created");
            } else {
              console.log("Error creating index", result);
            }

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _createUsersIndex.apply(this, arguments);
}

;

function createNotificationsIndex() {
  return _createNotificationsIndex.apply(this, arguments);
}

function _createNotificationsIndex() {
  _createNotificationsIndex = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var pipeline, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            pipeline = _redis.redisInstance.pipeline();
            pipeline.call('FT.DROPINDEX', indexNameNotifications); // FT.CREATE attentionsIdx ON HASH PREFIX 1 hpa:attentions: SCHEMA geo GEO

            pipeline.call('FT.CREATE', indexNameNotifications, 'ON', 'HASH', 'PREFIX', '1', (0, _redis.redisPrefix)('notifications'), 'SCHEMA', 'geo', 'GEO', 'userOrg', 'TAG');
            _context2.next = 5;
            return pipeline.exec();

          case 5:
            result = _context2.sent;

            if (result.length === 2 && result[1][1] === 'OK') {
              console.log("Index created");
            } else {
              console.log("Error creating index", result);
            }

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _createNotificationsIndex.apply(this, arguments);
}

;
createUsersIndex();
createNotificationsIndex();