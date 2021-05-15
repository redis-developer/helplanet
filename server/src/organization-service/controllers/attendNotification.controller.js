import createError from "http-errors";

// attend a notification
function AttendNotificationCtrl(notificationPersistence){            
    return async (req,res,next)=>{
        try {

            const userId = req.userId;
            const {                
                id                            
            } = req.params;
            

            let data = await notificationPersistence.getOneStream(userId);

            if(data.length==0) throw createError.NotFound("Data not found");
            console.log("notification data",data);
            // TODO await notificationPersistence.attendNotification(data[0]);

            res.json(data[0]);

        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

export default AttendNotificationCtrl;