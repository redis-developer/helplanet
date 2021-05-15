import createError from "http-errors";

// cancel a attention for notification
function CancelAttentionCtrl(notificationPersistence){            
    return async (req,res,next)=>{
        try {            
            const {                
              id                              
            } = req.params;
            
            await notificationPersistence.attendCancel(id);

            res.json({});

        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

export default CancelAttentionCtrl;