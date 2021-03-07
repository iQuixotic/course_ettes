// imports and variables
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import db from '../config/connection';
import { User, QueryMaker } from '../classes';
import SECRET from '../config/secret';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default {
    
    // CREATE a new db entry for login event
    login: async (req: any, res: Response): Promise<User> => {
        console.log('i am here sir')
        const validCredentials: boolean = await User.checkUser(req, req.body.email, req.body.password)
        
        if(validCredentials) {
            try {       
                const x = await db.query(QueryMaker.login( '*'), [req.body.email, req.body.password]) 

                // set response equal to the role_id (pre-striping) and create a new user
                const response = await db.query(QueryMaker.login('role_id'), [req.body.email, req.password] );
                const user: User = await new User(req.body) 
                
                // sign token and pass secret
                jwt.sign({ 
                    _id: req.body._id, email: req.body.email, 
                    password: req.body.password, role_id: response.rows[0].role_id }, 
                    SECRET.TOKEN_SECRET_KEY, {expiresIn: '16h'}, (err, token) => {
                        
                        // console.log(token)
                   res.json({ token });
                });
    
                return user;
             } catch (err) { 
                 throw err; 
             }
        } else res.json({message: 'Invalid Credentials'});
        
    },

}