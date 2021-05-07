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

var _user2 = _interopRequireDefault(require("../models/user.model"));

var _redisInit = require("../utils/redis.init.utils");

var _redis = require("../utils/redis.utils");

var prefix = 'users';

var UserRepository = /*#__PURE__*/function () {
  function UserRepository() {
    (0, _classCallCheck2["default"])(this, UserRepository);
  }

  (0, _createClass2["default"])(UserRepository, [{
    key: "save",
    value: function () {
      var _save = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(user) {
        var _user, id, result;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _user = new _user2["default"]();
                _user = user;
                id = _user.email;
                _context.next = 5;
                return _redis.redisInstance.hset("".concat((0, _redis.redisKey)(prefix, id), "{").concat(_redisInit.indexNameUsers, "}"), _user);

              case 5:
                result = _context.sent;
                _context.next = 8;
                return (0, _redisInit.createUsersIndex)();

              case 8:
                return _context.abrupt("return", result);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function save(_x) {
        return _save.apply(this, arguments);
      }

      return save;
    }()
  }, {
    key: "getByEmail",
    value: function () {
      var _getByEmail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(email) {
        var emailAddress, result;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // escape @
                // const emailAddress = email.replace(/\./g, '\\.').replace(/\@/g, '\\@');
                emailAddress = 'byron\\@hotmail\\.com'; // search by email on redis

                _context2.next = 3;
                return _redis.redisInstance.call('FT.SEARCH', _redisInit.indexNameUsers, "@email:{".concat(emailAddress, "}"));

              case 3:
                result = _context2.sent;
                return _context2.abrupt("return", result);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getByEmail(_x2) {
        return _getByEmail.apply(this, arguments);
      }

      return getByEmail;
    }()
  }, {
    key: "getById",
    value: function () {
      var _getById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id) {
        var result;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _redis.redisInstance.hgetall((0, _redis.redisKey)('users', id));

              case 2:
                result = _context3.sent;
                console.log(result);
                return _context3.abrupt("return", result);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getById(_x3) {
        return _getById.apply(this, arguments);
      }

      return getById;
    }()
  }]);
  return UserRepository;
}();

exports["default"] = UserRepository;