import createError from "http-errors";

// cancel Notification controller
function CancelNotificationCtrl(notificationPersistence){            
    return async (req,res,next)=>{
        try {
            //get id
            const {
                id
            } = req.params;

            let result = await notificationPersistence.removeNotification({id});
            res.json({});
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

export default CancelNotificationCtrl;