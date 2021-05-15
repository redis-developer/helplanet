"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

// send a notification for report
function SendNewReportCtrl(socketService, notificationRepository) {
  return /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            try {//TODO
              // await notificationRepository.listenStream((message)=>{
              //     console.log("MSN send report",message);
              //     socketService.sendNewReport(message);
              // });
            } catch (error) {
              console.log(error);
            }

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
}

var _default = SendNewReportCtrl;
exports["default"] = _default;