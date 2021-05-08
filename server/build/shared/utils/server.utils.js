"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizePort = normalizePort;
exports.onInitError = onInitError;
exports.onInitListenSuccess = onInitListenSuccess;

function normalizePort(valPort) {
  console.log("PORT =>", valPort); // convert to decimal

  var _port = parseInt(valPort, 10); // verify if is number


  if (isNaN(_port)) {
    return valPort;
  } // verify if is positive


  if (_port >= 0) {
    return _port;
  }

  return false;
}

function onInitError(service) {
  return function (error) {
    console.log(service + "=>>", error);
    throw error;
  };
}

function onInitListenSuccess(server) {
  return function () {
    var dataServer = server;
    console.log('dataserver', dataServer);
  };
}