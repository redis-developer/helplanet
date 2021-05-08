import createError from "http-errors";

// cancel Notification controller
function CancelNotificationCtrl(){            
    return async (req,res,next)=>{
        try {

        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

export default CancelNotificationCtrl;