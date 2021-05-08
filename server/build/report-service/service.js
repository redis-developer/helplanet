"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _helmet = _interopRequireDefault(require("helmet"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _report = _interopRequireDefault(require("./routes/report.route"));

// Byron Rosas => Reporter service
_dotenv["default"].config(); // express app


var app = (0, _express["default"])(); // white origin list

var whiteList = ['http://127.0.0.1:8100'];

var corsOptionsFunction = function corsOptionsFunction(req, callback) {
  var opt;

  if (whiteList.indexOf(req.header('Origin')) !== -1) {
    // opt with origin true => enable CORS for this request
    opt = {
      origin: true
    };
  } else {
    // opt with origin false => disable CORS for this request
    opt = {
      origin: false
    };
  } // callback params (error, opt)


  callback(null, opt);
}; // use cors with opt function


app.use((0, _cors["default"])(corsOptionsFunction));
app.use((0, _helmet["default"])());
app.use(_express["default"].json({
  limit: "1MB"
}));
app.use(_express["default"].urlencoded({
  limit: "1MB",
  extended: false
}));
app.use((0, _cookieParser["default"])()); // routes

app.use('/API/report', _report["default"]); //  handle error

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
});
var _default = app;
exports["default"] = _default;