import createError from "http-errors";

// send a notification for report
function SendNewReportCtrl(socketService, notificationRepository){            
    return async (message)=>{
        try {  
            //socket emit data real time          
            socketService.sendNewReport(message);                     
        } catch (error) {
            console.log(error);            
        }
    }
}

export default SendNewReportCtrl;