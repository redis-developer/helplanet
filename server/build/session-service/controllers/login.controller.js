"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _user = _interopRequireDefault(require("../../shared/models/user.model"));

var _token = require("../../shared/utils/token.utils");

// login controller
function LoginCtrl(userPersistence) {
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
      var _req$body, email, password, result, user, matchPass, token;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$body = req.body, email = _req$body.email, password = _req$body.password; // query user by email

              _context.next = 4;
              return userPersistence.getByEmail(email);

            case 4:
              result = _context.sent;

              if (!(result.length === 0)) {
                _context.next = 7;
                break;
              }

              throw _httpErrors["default"].NotFound("User by email not found");

            case 7:
              user = result[0]; // compare password

              _context.next = 10;
              return _user["default"].comparePassword(password, user.password);

            case 10:
              matchPass = _context.sent;

              if (matchPass) {
                _context.next = 13;
                break;
              }

              throw _httpErrors["default"].NotFound("Password and email do not correct");

            case 13:
              _context.next = 15;
              return (0, _token.signToken)(user.email);

            case 15:
              token = _context.sent;
              res.json({
                token: token,
                username: user.username,
                role: user.role
              });
              _context.next = 23;
              break;

            case 19:
              _context.prev = 19;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);
              next(_context.t0);

            case 23:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 19]]);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
}

var _default = LoginCtrl;
exports["default"] = _default;