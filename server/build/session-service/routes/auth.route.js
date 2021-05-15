"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = require("../../shared/midlewares/auth.midleware");

var _user = _interopRequireDefault(require("../../shared/repositories/user.repository"));

var AuthController = _interopRequireWildcard(require("../controllers"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = (0, _express["default"])();
var userRepository = new _user["default"]();
router.post('/register', AuthController.RegisterCtrl(userRepository));
router.post('/login', AuthController.LoginCtrl(userRepository));
router.get('/logout', [_auth.isAuth], AuthController.LogoutCtrl());
router.post('/set-role', [_auth.isAuth, _auth.isAdmin], AuthController.SetRoleCtrl(userRepository));
router.get('/all/:page', AuthController.GetUsersCtrl(userRepository));
router.post('/recovery-pass', AuthController.RecoverPasswordCtrl(userRepository));
var _default = router;
exports["default"] = _default;