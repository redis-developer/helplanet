"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "LoginCtrl", {
  enumerable: true,
  get: function get() {
    return _login["default"];
  }
});
Object.defineProperty(exports, "RecoverPasswordCtrl", {
  enumerable: true,
  get: function get() {
    return _recoverPassword["default"];
  }
});
Object.defineProperty(exports, "RegisterCtrl", {
  enumerable: true,
  get: function get() {
    return _register["default"];
  }
});
Object.defineProperty(exports, "LogoutCtrl", {
  enumerable: true,
  get: function get() {
    return _logout["default"];
  }
});

var _login = _interopRequireDefault(require("./login.controller"));

var _recoverPassword = _interopRequireDefault(require("./recover-password.controller"));

var _register = _interopRequireDefault(require("./register.controller"));

var _logout = _interopRequireDefault(require("./logout.controller"));