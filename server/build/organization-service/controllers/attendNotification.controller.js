"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

// attend a notification
function AttendNotificationCtrl(notificationPersistence) {
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
      var userId, id, data;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              userId = req.userId;
              id = req.params.id;
              _context.next = 5;
              return notificationPersistence.getOneStream(userId);

            case 5:
              data = _context.sent;

              if (!(data.length == 0)) {
                _context.next = 8;
                break;
              }

              throw _httpErrors["default"].NotFound("Data not found");

            case 8:
              console.log("notification data", data); // TODO await notificationPersistence.attendNotification(data[0]);

              res.json(data[0]);
              _context.next = 16;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);
              next(_context.t0);

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 12]]);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
}

var _default = AttendNotificationCtrl;
exports["default"] = _default;