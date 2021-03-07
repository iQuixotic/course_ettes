import db from '../../../config/connection';
import { QueryMaker, Role } from '../../';
import bcrypt from 'bcrypt';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class User {
    private email: string; 
    private password: string; 
    private first_name: string;
    private last_name: string; 
    private role_id: Role;

    constructor(obj) {      
        if(!obj) {
            return;   
        }          
        this.email = obj.email;
        this.password = obj.password;
        this.first_name = obj.first_name;
        this.last_name = obj.last_name;
        this.role_id = obj.role_id;
    }
    
    static async hashPass(pass) {        

        //generate a salt, hash password, then return hashed password
         const saltBae = await bcrypt.genSalt(10);
         const hashed = await bcrypt.hash(pass, saltBae);
         return hashed;
    }

    static async checkUser(req, email, password){

        // get the hashed password (y) and compare it to the one in the db 
        const x = await db.query(QueryMaker.getHashedPass(), [email]);
        const y = x.rows[0].password;
        console.log('y', y);
        const match = await bcrypt.compare(password, y);

        // set req.password to use on login controller
        req.password = y;

        // login if match is true
        return match;     
    }
}

export default User;