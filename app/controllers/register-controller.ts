// imports and variables
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import db from '../config/connection';
import MESSAGES  from '../utils/messages';
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
                        role_id: 2
                    }

                    const user = new User(obj);
                    const myVals = Object.values(user);

                    // insert user
                    await db.query(X.insertOneUser(), myVals);           
                    res.status(201).json({
                    message: `New user ${req.body.first_name} ${req.body.last_name} created !!`
            });
        } catch (err) {
            let errBody = [];
            if(!req.body.first_name) errBody.push(MESSAGES("missingFirstName"))
            if(!req.body.password) errBody.push(MESSAGES("missingPass"))
            if(!req.body.last_name) errBody.push(MESSAGES("missingLastName"))
            if(!req.body.email) errBody.push(MESSAGES("missingEmail"))
            if(err.detail.includes("already exists")) errBody.push(MESSAGES("alreadyExists"))

            errBody = Object.assign({}, ...errBody);
            if(err && errBody) res.status(500).json({errors: errBody});
            else if(!errBody && err) res.status(500).json({errors: err});
            else res.status(500).json({errors: "Unknown server error occured."});
        } 
    }
}