"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAuth = isAuth;
exports.isAdmin = isAdmin;
exports.isUserReport = isUserReport;
exports.isUserOrganization = isUserOrganization;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _user = _interopRequireDefault(require("../repositories/user.repository"));

var _token = require("../utils/token.utils");

var userRepository = new _user["default"](); // verify if user is logged in

function isAuth(_x, _x2, _x3) {
  return _isAuth.apply(this, arguments);
} // verify if user is reporter


function _isAuth() {
  _isAuth = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var authHeader, bearerToken, token, tokenDecoded, idUser, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(req.headers); // verify if header authorization exists

            if (req.headers['authorization']) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", next(_httpErrors["default"].Unauthorized()));

          case 3:
            // get all header authorization string
            authHeader = req.headers["authorization"]; // divide string [bearer,token]

            bearerToken = authHeader.split(" "); // get only token

            token = bearerToken[1]; // verify if token exists

            if (token) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", next(_httpErrors["default"].Unauthorized("No token provided")));

          case 8:
            _context.prev = 8;
            _context.next = 11;
            return (0, _token.verifyToken)(token);

          case 11:
            tokenDecoded = _context.sent;
            idUser = tokenDecoded.aud; // verify user exists

            _context.next = 15;
            return userRepository.getById(idUser);

          case 15:
            user = _context.sent;

            if (user) {
              _context.next = 18;
              break;
            }

            throw _httpErrors["default"].NotFound('User not found');

          case 18:
            if (!(user.status === 0)) {
              _context.next = 20;
              break;
            }

            throw _httpErrors["default"].Unauthorized("Account is disabled");

          case 20:
            req.userId = idUser;
            req.role = user.role;
            next();
            _context.next = 32;
            break;

          case 25:
            _context.prev = 25;
            _context.t0 = _context["catch"](8);

            if (!(_context.t0.name === 'JsonWebTokenError')) {
              _context.next = 31;
              break;
            }

            return _context.abrupt("return", next(_httpErrors["default"].Unauthorized()));

          case 31:
            return _context.abrupt("return", next(_httpErrors["default"].Unauthorized(_context.t0.message)));

          case 32:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[8, 25]]);
  }));
  return _isAuth.apply(this, arguments);
}

function isUserReport(req, res, next) {
  try {
    var role = req.role; // role 1 is reporter

    if (role == undefined || role == null || role != 1) throw _httpErrors["default"].Unauthorized("Invalid role");
    next();
  } catch (error) {
    next(error);
  }
} // verify if user is organization or collaborator


function isUserOrganization() {
  try {
    var role = req.role; // role 2 is organization or collaborator

    if (role == undefined || role == null || role != 2) throw _httpErrors["default"].Unauthorized("Invalid role");
    next();
  } catch (error) {
    next(error);
  }
} // verify if user is administrator


function isAdmin() {
  try {
    var role = req.role; // role 0 is admministrator

    if (role == undefined || role == null || role == 0) throw _httpErrors["default"].Unauthorized("Invalid role");
    next();
  } catch (error) {
    next(error);
  }
}