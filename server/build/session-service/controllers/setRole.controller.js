"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

// Set role controller
function SetRoleCtrl(userPersistence) {
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
      var _req$body, email, role, result, user;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$body = req.body, email = _req$body.email, role = _req$body.role; // verify if user with email exists

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
              user = result[0]; // update user

              _context.next = 10;
              return userPersistence.updateByEmail(email, ["role", role]);

            case 10:
              // response
              res.json({
                content: 'User role updated'
              });
              _context.next = 17;
              break;

            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);
              next(_context.t0);

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 13]]);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
}

var _default = SetRoleCtrl;
exports["default"] = _default;