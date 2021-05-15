import createError from "http-errors";

// cancel a attention for notification
function CancelAttentionCtrl(notificationPersistence){            
    return async (req,res,next)=>{
        try {            
            const userOrg = req.email;

            const {                
              id                              
            } = req.params;                        

            let data = await notificationPersistence.getOne(id);
            
            if(data==null) throw createError.NotFound("Data not found");
            if(data.userOrg==null) throw createError.NotFound("Data didnt attend");
            if(data.userOrg!=userOrg) throw createError.NotFound("You do not have permission to cancel this notification.");


            await notificationPersistence.attendCancel(id);

            res.json({});

        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

export default CancelAttentionCtrl;