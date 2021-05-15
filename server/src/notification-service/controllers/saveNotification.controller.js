import createError from "http-errors";

// save a notification for report
function SaveNotificationCtrl(notificationRepository){            
    return async (data)=>{
        try {
            //save data  notification
            await notificationRepository.save(data);
                     

        } catch (error) {
            console.log(error);            
        }
    }
}

export default SaveNotificationCtrl;