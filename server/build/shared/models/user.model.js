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

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var User = /*#__PURE__*/function () {
  function User() {
    (0, _classCallCheck2["default"])(this, User);
    (0, _defineProperty2["default"])(this, "username", void 0);
    (0, _defineProperty2["default"])(this, "password", void 0);
    (0, _defineProperty2["default"])(this, "email", void 0);
    (0, _defineProperty2["default"])(this, "status", void 0);
    (0, _defineProperty2["default"])(this, "role", void 0);
  }

  (0, _createClass2["default"])(User, null, [{
    key: "encryptPassword",
    value: function () {
      var _encryptPassword = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(password) {
        var passHash;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _bcryptjs["default"].hash(password, 10);

              case 2:
                passHash = _context.sent;
                return _context.abrupt("return", passHash);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function encryptPassword(_x) {
        return _encryptPassword.apply(this, arguments);
      }

      return encryptPassword;
    }()
  }, {
    key: "comparePassword",
    value: function () {
      var _comparePassword = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(password, hash) {
        var _password;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _bcryptjs["default"].compare(password, hash);

              case 2:
                _password = _context2.sent;
                return _context2.abrupt("return", _password);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function comparePassword(_x2, _x3) {
        return _comparePassword.apply(this, arguments);
      }

      return comparePassword;
    }()
  }]);
  return User;
}();

exports["default"] = User;