// imports and variables
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import db from '../config/connection';
import { default as X } from '../utils/sql-commands';
import { User } from '../classes';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default {

    // register a new user
    addOne: async (req: Request, res: Response) => {
        
        try {
            
            //generate a salt
            const saltBae = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, saltBae);

                    let obj = {
                        password: hashed,                       
                        first_name: req.body.first_name, 
                        last_name: req.body.last_name, 
                        email: req.body.email, 
                        role_id: req.body.role_id
                    }

                    const user = new User(obj);
                    const myVals = Object.values(user);

                    // insert user
                    await db.query(X.insertOneUser(), myVals);           
                    res.status(201).json({
                    message: `New user ${req.body.first_name} created !!`
            });
        } catch (err) {
            res.status(500).json({error: err});
        } 
    }
}