// import and execution for init services (different process)
const { fork } = require('child_process');

fork(__dirname+'/organization-service/index.js')
fork(__dirname+'/report-service/index.js')
fork(__dirname+'/session-service/index.js')
fork(__dirname+'/notification-service/index.js')
//import { OrganizationServiceInit } from "./organization-service";
//import { ReportServiceInit } from "./report-service";
//import { SessionServiceInit } from "./session-service";
//import { NotificationServiceInit } from "./notification-service";
// create administrator function
import { LoadAdministrator } from "./shared/utils/redis.dataload.utils";

LoadAdministrator();

console.log("Init all services");
