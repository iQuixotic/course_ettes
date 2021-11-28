// imports and variables
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import db from '../config/connection';
import { MESSAGE, ERROR } from '../utils/messages';
import { default as X } from '../utils/sql-commands';
import { User } from '../classes';
import databaseHelper from '../utils/database-helper';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default {

    // register a new user
    addOne: async (req: Request, res: Response) => {
        
        try {            
            //generate a salt
            const saltBae = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, saltBae);
            let id = databaseHelper.createUniqueId()
                    let obj = {
                        _id: id,
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
            if(!req.body.first_name) errBody.push(ERROR("missingFirstName"))
            if(!req.body.password) errBody.push(ERROR("missingPass"))
            if(!req.body.last_name) errBody.push(ERROR("missingLastName"))
            if(!req.body.email) errBody.push(ERROR("missingEmail"))
            if(err.detail.includes("already exists")) errBody.push(ERROR("alreadyExists"))

            errBody = Object.assign({}, ...errBody);
            if(err && errBody) res.status(500).json({errors: errBody});
            else if(!errBody && err) res.status(500).json({errors: err});
            else res.status(500).json({errors: "Unknown server error occured."});
        } 
    }
}