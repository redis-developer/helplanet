import { removeToken } from "../../shared/utils/token.utils";

// Logout controller
function LogoutCtrl(){        
    return async (req,res,next)=>{
        try {
            const userId = req.userId;
            console.log(userId);
            // remove token on redis
            const removed = await removeToken(userId);
            
            // response
            res.json({});

        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

export default LogoutCtrl;