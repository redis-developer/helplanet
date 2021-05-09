import { ReportServiceInit } from "./report-service";
import { SessionServiceInit } from "./session-service";
// create administrator function
import { LoadAdministrator } from "./shared/utils/redis.dataload.utils";

LoadAdministrator();

console.log("Init all services");

// TODO init organization service
// TODO init notification service