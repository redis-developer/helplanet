"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

// Get all notifications
function ListNotificationsSavedCtrl(notificationPersistence) {
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
      var page, limit, minLimit, maxLimit, result;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              page = req.params.page;
              limit = 10;
              minLimit = 0;
              maxLimit = 0; // get values for pagination            

              if (page) {
                minLimit = page * limit;
                maxLimit = minLimit + limit;
              } // get data for page


              _context.next = 8;
              return notificationPersistence.getAll(minLimit, maxLimit);

            case 8:
              result = _context.sent;
              // response
              res.json({
                page: page,
                minLimit: minLimit,
                maxLimit: maxLimit,
                result: result
              });
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

var _default = ListNotificationsSavedCtrl;
exports["default"] = _default;