import createError from "http-errors";
import User from "../../shared/models/user.model";
import { signToken } from "../../shared/utils/token.utils";

// login controller
function LoginCtrl(userPersistence){            
    return async (req,res,next)=>{
        try {
            const { email, password} = req.body;            
            
            // query user by email
            const result = await userPersistence.getByEmail(email);

            // verify if user exists
            if(result.length === 0) throw createError.NotFound("User by email not found");
            
            const user = result[0];

            // compare password
            const matchPass = await User.comparePassword(password,user.password);
            if(!matchPass) throw createError.NotFound("Password and email do not correct");
            
            // generate token            
            const token = await signToken(user.email);

            res.json({token:token,username:user.username,role:user.role});

        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

export default LoginCtrl;