// imports and variables
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import db from '../config/connection';
import { User } from '../classes';
import { default as X } from '../utils/sql-commands';
import SECRET from '../config/secret';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default {
    
    // CREATE a new db entry for login event
    login: async (req: any, res: Response): Promise<User> => {
        console.log("hells")
        console.log(req.body.email, req.body.password)
        const validCredentials: boolean = await User.checkUser(req, req.body.email, req.body.password)
        console.log(validCredentials)
        if(validCredentials) {
            try {       
                const x = await db.query(X.login('*'), [req.body.email, req.body.password]) 
                
                // set response equal to the role_id (pre-striping) and create a new user
                const response = await db.query(X.login('role_id'), [req.body.email, req.password] );
                const user: User = await new User(req.body) 
                console.log("this is the user", user)
                // sign token and pass secret
                jwt.sign({ 
                    email: req.body.email, role_id: response.rows[0].role_id }, 
                    'secret', {expiresIn: '365d'}, (err, token) => {
                        
                        // console.log(token)
                        console.log(token)
                   res.json({ token });
                });
    
                return user;
             } catch (err) { 
                 throw err; 
             }
        } else res.json({message: 'Invalid Credentials'});
        
    },

}