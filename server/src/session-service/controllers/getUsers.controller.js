import createError from "http-errors";

// Get all users
function GetUsersCtrl(userPersistence){        
    return async (req,res,next)=>{
        try {         
            const {page} = req.params;    
            
            const limit = 10;            
            let minLimit = 0;            
            let maxLimit = 0;

            // get values for pagination            
            if(page){
                minLimit = (page*limit)
                maxLimit = minLimit+limit;
            }
            let result = [];  
            
            if(req.params.email == undefined)
            {
                
                // get data for page
                const r = await userPersistence.getAll(minLimit,maxLimit);
                result.push(...r);
            } else{                
                
                const r = await userPersistence.getByEmail(req.params.email);
                result.push(...r);
            }           

            
            // response
            res.json({page, minLimit, maxLimit, result});

        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

export default GetUsersCtrl;