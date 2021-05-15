"use strict";

var _organizationService = require("./organization-service");

var _reportService = require("./report-service");

var _sessionService = require("./session-service");

var _redisDataload = require("./shared/utils/redis.dataload.utils");

// import and execution for init services
//import { NotificationServiceInit } from "./notification-service";
// create administrator function
(0, _redisDataload.LoadAdministrator)();
console.log("Init all services");