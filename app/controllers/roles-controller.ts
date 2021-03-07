// imports
import { Request, Response } from 'express';
import db from '../config/connection';
import { QueryMaker, Role } from '../classes';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default {

     // CREATE a new database entry  
     addOne: async (req: Request, res: Response) => {
        try {            
            const role = new Role(req.body);
            const myKeys = Object.keys(role);
            const myVals = Object.values(role);
            await db.query(QueryMaker.insertOne('roles', myKeys), myVals); 
            res.json({message: 'New role added!!'});
        } catch (err) { throw err }; 
    },

    // GET all roles in the database
    getAll: async (req: Request, res: Response) => {
        try {                 
            const x = await db.query(QueryMaker.getAll('roles'))
            res.json(x.rows);
        } catch (err) { throw err; }
    },

    // READ a single role from the database
    getById: async (req: Request, res: Response) => {
        try {
            const x = await db.query(QueryMaker.getOne('roles', '_id'), [req.params.roleId]);
            res.json(x.rows[0]);
        }  catch (err) { throw err; }      
    },

     // UPDATE a role in the database  
     updateOne: async (req: Request, res: Response) => {
        try {            
            const x = await db.query( QueryMaker.getOne('roles', '_id'), [req.params.roleId]);
            const role = new Role({...x.rows[0], ...req.body});
            const myKeys = Object.keys(role);
            const myVals = Object.values(role);
            const valsAndID =  [req.params.roleId, ...myVals]
            await db.query( QueryMaker.setOne('roles', '_id', myKeys.length, myKeys), valsAndID); 
            res.json({message: 'role updated !!'});
        } catch (err) { throw err }; 
    },

     // DELETE a database entry  
     deleteOne: async (req: Request, res: Response) => {
        try {            
            await db.query( QueryMaker.deleteOne('roles', '_id'), [req.params.roleId]);
            res.json({message: `role deleted !!`});
        } catch (err) { throw err }; 
    }
}