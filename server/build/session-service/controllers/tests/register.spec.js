"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _globals = require("@jest/globals");

var _supertest = _interopRequireDefault(require("supertest"));

var _redis = require("../../../shared/utils/redis.utils");

describe("register user", function () {
  test("it should register a user and start session and return token and user", function (done) {
    var input = {
      email: "test@test",
      password: "1233456",
      username: "testname",
      status: 1,
      //status active(1) or inactive(0)
      role: 1 //role admin(0) reporter(1) collaborator(2)

    };
    var output = {};
    (0, _supertest["default"])(app).post("/user/login").send(input).then(function (response) {
      //   TODO remove test user
      (0, _globals.expect)(response.statusCode).toBe(200);
      (0, _globals.expect)(response).toHaveProperty('id');
      (0, _globals.expect)(response).toHaveProperty('email');
      (0, _globals.expect)(response).toHaveProperty('token');

      var cacheToken = _redis.redisInstance.get((0, _redis.redisKey)('session', id));

      (0, _globals.expect)(cacheToken).toEqual(response.token);
      done();
    });
  });
});