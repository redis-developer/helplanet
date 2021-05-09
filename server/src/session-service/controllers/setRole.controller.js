import createError from "http-errors";

// Set role controller
function SetRoleCtrl(userPersistence){        
    return async (req,res,next)=>{
        try {
            const { email, role } = req.body;
            
            // verify if user with email exists
            const result = await userPersistence.getByEmail(email);

            if(result.length === 0) throw createError.NotFound("User by email not found");
            
            const user = result[0];

            // update user
            await userPersistence.updateByEmail(email,["role",role]);                                                
            
            // response
            res.json({content:'User role updated'});

        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

export default SetRoleCtrl;