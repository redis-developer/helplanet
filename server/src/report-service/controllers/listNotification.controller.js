import createError from "http-errors";

// list Notification controller
function ListNotificationCtrl(notificationPersistence){            
    return async (req,res,next)=>{
        try {
            
            const email = req.email;
            const {page} = req.params;    
            const limit = 10;            
            let minLimit = 0;            
            let maxLimit = 0;

            // get values for pagination            
            if(page){
                minLimit = (page*limit)
                maxLimit = minLimit+limit;
            }
                        
            // get data for page
            let result = await notificationPersistence.getAllByUser(email,minLimit,maxLimit);
            res.json(result);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

export default ListNotificationCtrl;