"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _globals = require("@jest/globals");

var _supertest = _interopRequireDefault(require("supertest"));

var _redis = require("../../../shared/utils/redis.utils");

describe("login user", function () {
  test("it should cache a user's session and return token and user", function (done) {
    var input = {
      email: "test@test",
      password: "1233456"
    };
    var output = {};
    (0, _supertest["default"])(app).post("/user/login").send(input).then(function (response) {
      (0, _globals.expect)(response.statusCode).toBe(200);
      (0, _globals.expect)(response).toHaveProperty('id');
      (0, _globals.expect)(response).toHaveProperty('email');
      (0, _globals.expect)(response).toHaveProperty('username');
      (0, _globals.expect)(response).toHaveProperty('token');

      var cacheToken = _redis.redisInstance.get('session', (0, _redis.redisKey)(id));

      (0, _globals.expect)(cacheToken).toEqual(response.token);
      done();
    });
  });
});