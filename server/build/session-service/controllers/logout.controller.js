"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _token = require("../../shared/utils/token.utils");

// Logout controller
function LogoutCtrl() {
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
      var userId, removed;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              userId = req.userId;
              console.log(userId); // remove token on redis

              _context.next = 5;
              return (0, _token.removeToken)(userId);

            case 5:
              removed = _context.sent;
              // response
              res.json({});
              _context.next = 13;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);
              next(_context.t0);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 9]]);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
}

var _default = LogoutCtrl;
exports["default"] = _default;