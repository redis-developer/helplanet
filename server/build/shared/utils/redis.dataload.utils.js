"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadAdministrator = LoadAdministrator;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../models/user.model"));

var _user2 = _interopRequireDefault(require("../repositories/user.repository"));

function LoadAdministrator() {
  return _LoadAdministrator.apply(this, arguments);
}

function _LoadAdministrator() {
  _LoadAdministrator = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var userPersistence, email, result, admin;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userPersistence = new _user2["default"](); // verify if user admin exists

            email = "byron@xyz.com"; // query user by email

            _context.next = 4;
            return userPersistence.getByEmail(email);

          case 4:
            result = _context.sent;

            if (!(result.length === 0)) {
              _context.next = 16;
              break;
            }

            // if user doesnt exist create
            console.log("adding admin"); // load administrator

            admin = new _user["default"]();
            admin.email = email;
            _context.next = 11;
            return _user["default"].encryptPassword("root123");

          case 11:
            admin.password = _context.sent;
            admin.role = 0; // 0 for admin

            admin.status = 1; // 1 for active

            admin.username = "byronman"; // save user admin

            userPersistence.save(admin);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _LoadAdministrator.apply(this, arguments);
}