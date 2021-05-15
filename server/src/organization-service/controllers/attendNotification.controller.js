import createError from "http-errors";

// attend a notification
function AttendNotificationCtrl(notificationPersistence){            
    return async (req,res,next)=>{
        try {
            
            const userOrg = req.email;
       
            const {                
                id                            
            } = req.params;
            

            let data = await notificationPersistence.getOne(id);

            if(data==null) throw createError.NotFound("Data not found")            
            await notificationPersistence.attendNotification(id,data, userOrg);

            res.json(data[0]);

        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

export default AttendNotificationCtrl;