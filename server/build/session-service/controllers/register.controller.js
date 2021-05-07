"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../../shared/models/user.model"));

var _token = require("../../shared/utils/token.utils");

// Register controller
function RegisterCtrl(userPersistence) {
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
      var _req$body, username, password, email, user, token;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$body = req.body, username = _req$body.username, password = _req$body.password, email = _req$body.email;
              user = new _user["default"]();
              user.username = username;
              user.role = 1;
              user.status = 1;
              _context.next = 8;
              return _user["default"].encryptPassword(password);

            case 8:
              user.password = _context.sent;
              user.email = email; // save user

              _context.next = 12;
              return userPersistence.save(user);

            case 12:
              _context.next = 14;
              return (0, _token.signToken)(user.email);

            case 14:
              token = _context.sent;
              // response
              res.json({
                token: token,
                username: user.username,
                role: user.role
              });
              _context.next = 22;
              break;

            case 18:
              _context.prev = 18;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);
              next(_context.t0);

            case 22:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 18]]);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
}

var _default = RegisterCtrl;
exports["default"] = _default;