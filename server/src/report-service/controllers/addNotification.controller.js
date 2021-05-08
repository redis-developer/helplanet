import createError from "http-errors";

// add Notification controller
function AddNotificationCtrl(notificationPersistence){            
    return async (req,res,next)=>{
        try {

            const userId = req.userId;
            const {                
                level,//gravity    (0) YELLOW, (1) ORANGE, (2) RED
                text,
                geo,//{lat,lon}
                situation,                            
            } = req.body;

            console.log(req.body);
            await notificationPersistence.addStream({level,text,geo,situation, userId});

            res.json({});

        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

export default AddNotificationCtrl;