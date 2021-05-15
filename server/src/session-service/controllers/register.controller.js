import User from "../../shared/models/user.model";
import { signToken } from "../../shared/utils/token.utils";

// Register controller
function RegisterCtrl(userPersistence){        
    return async (req,res,next)=>{
        try {
            const { username, password, email } = req.body;
            const user = new User();
            user.username = username;
            user.role = 1;
            user.status = 1;
            user.password = await User.encryptPassword(password);
            user.email = email;            
            // save user
            await userPersistence.save(user);
                        
            // sign token
            const token = await signToken(user.email);
            
            // response
            res.json({token, username:user.username, role:user.role, email:user.email});

        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

export default RegisterCtrl;