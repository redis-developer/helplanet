import User from "../models/user.model";
import UserRepository from "../repositories/user.repository";

export async function LoadAdministrator(){
    const userPersistence = new UserRepository();
    // verify if user admin exists
    const email = "byron@xyz.com";
    // query user by email
    const result = await userPersistence.getByEmail(email);

    // verify if user exists
    if(result.length === 0){
        // if user doesnt exist create
        
        // load administrator
        const admin = new User();    
        admin.email = email;
        admin.password = await User.encryptPassword("root123");
        admin.role = 0; // 0 for admin
        admin.status = 1; // 1 for active
        admin.username = "byronman";

        
        // save user admin
        userPersistence.save(admin);
    }        

}
