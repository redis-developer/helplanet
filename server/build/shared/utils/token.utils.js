"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signToken = signToken;
exports.verifyToken = verifyToken;
exports.removeToken = removeToken;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireWildcard(require("jsonwebtoken"));

var _redis = require("./redis.utils");

var _httpErrors = _interopRequireDefault(require("http-errors"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function signToken(_x) {
  return _signToken.apply(this, arguments);
}

function _signToken() {
  _signToken = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userId) {
    var options, payload, token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // token options   
            options = {
              expiresIn: "24h",
              issuer: process.env.DOMAIN,
              audience: userId
            };
            payload = {}; // sign token with payload and options

            _context.next = 4;
            return _jsonwebtoken["default"].sign(payload, process.env.SECRET_TOKEN, options);

          case 4:
            token = _context.sent;
            _context.next = 7;
            return _redis.redisInstance.set((0, _redis.redisKey)('session', userId), token, 'EX', 24 * 60 * 60);

          case 7:
            return _context.abrupt("return", token);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _signToken.apply(this, arguments);
}

function removeToken(_x2) {
  return _removeToken.apply(this, arguments);
}

function _removeToken() {
  _removeToken = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(userId) {
    var result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _redis.redisInstance.del((0, _redis.redisKey)('session', userId));

          case 2:
            result = _context2.sent;
            return _context2.abrupt("return", result);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _removeToken.apply(this, arguments);
}

function verifyToken(_x3) {
  return _verifyToken.apply(this, arguments);
}

function _verifyToken() {
  _verifyToken = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(token) {
    var decoded, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _jsonwebtoken["default"].verify(token, process.env.SECRET_TOKEN);

          case 2:
            decoded = _context3.sent;
            console.log(token, decoded); // verify if exists on db

            _context3.next = 6;
            return _redis.redisInstance.get((0, _redis.redisKey)('session', decoded.aud));

          case 6:
            result = _context3.sent;

            if (result) {
              _context3.next = 9;
              break;
            }

            throw _httpErrors["default"].Unauthorized();

          case 9:
            return _context3.abrupt("return", decoded);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _verifyToken.apply(this, arguments);
}