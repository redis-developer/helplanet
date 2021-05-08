"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotificationModel = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var NotificationModel = function NotificationModel() {
  (0, _classCallCheck2["default"])(this, NotificationModel);
  (0, _defineProperty2["default"])(this, "level", void 0);
  (0, _defineProperty2["default"])(this, "text", void 0);
  (0, _defineProperty2["default"])(this, "geo", void 0);
  (0, _defineProperty2["default"])(this, "situation", void 0);
  (0, _defineProperty2["default"])(this, "idUser", void 0);
};

exports.NotificationModel = NotificationModel;