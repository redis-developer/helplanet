import createError from "http-errors";

// list near Notification controller
function ListNearNotificationsCtrl(notificationPersistence){            
    return async (req,res,next)=>{
        try {
            let {
                lon,
                lat
            } = req.params;            
            let result = await notificationPersistence.getNear(lon,lat);
            console.log("near",result);
            res.json(result);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

export default ListNearNotificationsCtrl;