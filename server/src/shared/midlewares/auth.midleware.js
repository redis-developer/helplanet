import createError from 'http-errors';
import UserRepository from '../repositories/user.repository';
import { verifyToken } from '../utils/token.utils';
 const userRepository = new UserRepository();
// verify if user is logged in
async function isAuth(req,res,next){    
    // verify if header authorization exists
    if(!req.headers['authorization']) return next(createError.Unauthorized());

    // get all header authorization string
    const authHeader = req.headers["authorization"];    
    // divide string [bearer,token]
    const bearerToken = authHeader.split(" ");
    // get only token
    const token = bearerToken[1];

    // verify if token exists
    if (!token) return next(createError.Unauthorized("No token provided"));

    try {
        // decoded token
        const tokenDecoded = await verifyToken(token);
        const idUser = tokenDecoded.aud;
        // verify user exists
        const user = await userRepository.getById(idUser);
        if (!user) throw createError.NotFound('User not found');
        //console.log("user auth=>",user);
        // verify account enable
        if(user.status === 0) throw createError.Unauthorized("Account is disabled"); 

        req.userId = idUser;
        req.email = user.email;
        req.role = user.role;

        next();
        
    } catch (error) {
        if(error.name === 'JsonWebTokenError'){
            return next(createError.Unauthorized());
        }
        else{
            return next(createError.Unauthorized(error.message)); 
        }
    }


}

// verify if user is reporter
function isUserReport(req,res,next){
    try {
        const role = req.role;
        // role 1 is reporter        
        if(role==undefined || role == null)  throw createError.Unauthorized("Invalid role");        

        next();
    } catch (error) {
        next(error);
    }
}

// verify if user is organization or collaborator
function isUserOrganization(req,res,next){
    try {
        const role = req.role;        
        // role 2 is organization or collaborator
        if(role==undefined || role == null || role == 1)  throw createError.Unauthorized("Invalid role");        

        next();
    } catch (error) {
        next(error);
    }
}

// verify if user is administrator
function isAdmin(req,res,next){
    try {
        const role = req.role;             
        // role 0 is admministrator
        if(role==undefined || role == null || role != 0)  throw createError.Unauthorized("Invalid role");        

        next();
    } catch (error) {
        next(error);
    }
}

export {
    isAuth,
    isAdmin,
    isUserReport,
    isUserOrganization
}