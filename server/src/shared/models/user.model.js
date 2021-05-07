import bcrypt from 'bcryptjs';

export default class User{        
    username
    password
    email
    status
    role

    static async encryptPassword(password){              
        const passHash = await bcrypt.hash(password,10);        
        return passHash;
    }


    static async comparePassword(password,hash){
        const _password = await bcrypt.compare(password,hash);
        return _password;
    }

}
