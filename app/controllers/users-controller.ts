// imports
import { Request, Response } from 'express';
import db from '../config/connection';
import { QueryMaker, User } from '../classes';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default {

    returnRoleInfo: async (req: any, res: Response) => {
        if(req.authData['role_id'] === 1 ||
         req.authData['role_id'] === 2 ||
         req.authData['role_id'] === 3) {
            res.json({ role_id: req.authData['role_id'] })
        }
    },

    // READ all users
    getAll: async (req: any, res: Response) => {

            // only FINANCE MANAGERS
            if(req.authData['role_id'] === 1 || req.authData['role_id'] === 2) {
                try {                 
                    const userArr = [];

                    // put users in an array
                    const x = await db.query(QueryMaker.getAll('users'))
                    x.rows.forEach(el => {
                        const user = new User(el);  
                        userArr.push(user)              
                    });
                    
                    return res.json(x.rows);
                } catch (err) {
                    throw err;
                }
            } else{
                res.json({message: 'Only Finance managers may view all users'});
            }
      },

    // READ a single user by id
    getOne: async (req: any, res: Response) => {
        
        // FINANCE MANAGERS and CURRENT USERS
        if(req.authData['role_id'] === 1 || req.params.id == req.selfReference) {
                try {
                    const id = await req.params.id;
                    const x = await db.query(
                        QueryMaker.getOne('users', '_id'), [id]);
                    const user = await new User(x.rows[0]);
                    
                    return res.json(user);
                } 
                catch (err) {
                    throw err;
                } 
            } 
            else {
                res.json({message: 'Only Finance managers or ticket holders may view users in this way.'});
            }
    },

    // UPDATE a single user at any field    
    update: async (req: any, res: Response) => {

        // only ADMINS
        if(req.authData['role_id'] === 2) {
            try {
                // get a full user and construct patched together obj as user
                const x = await db.query(
                    QueryMaker.getOne('users', '_id'), [req.body._id]);
                    console.log('this will be the x', x.rows[0])
                const user = await new User({...x.rows[0], ...req.body});


                // deconstruct user into 2 arrays like: [keys] [vals]
                const myKeys = Object.keys(user);
                const myVals = Object.values(user);
    
                // -1 to account for id 
                const y = await db.query(
                    QueryMaker.setOne('users', '_id', myKeys.length-1, myKeys),
                     myVals);

                return res.json(user);
            } catch (err) {
                throw err;
            } 
        } else {
            res.json({message: "Only admins may update a user."})
        }
    }
}