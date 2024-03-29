import db from '../../../config/connection';
import { Role } from '../../';
import { default as X } from '../../../utils/sql-commands';
import bcrypt from 'bcrypt';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class User {
    
    private _id: string
    private email: string; 
    private password: string; 
    private first_name: string;
    private last_name: string; 
    private role_id: Role;

    constructor(obj) {      
        if(!obj) {
            return;   
        }        
        this._id = obj._id;
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
        let y = '';

        // get the hashed password (y) and compare it to the one in the db 
        const x = await db.query(X.getHashedPass(), [email]);
        if(x.rows.length > 0)  y = x.rows[0].password;
        const match = await bcrypt.compare(password, y);

        // set req.password to use on login controller
        req.password = y;

        // login if match is true
        return match;     
    }
}

export default User;