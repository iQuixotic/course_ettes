// imports
import { Request, Response } from 'express';
import db from '../config/connection';
import { QueryMaker, Color } from '../classes';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default {

    // GET all colors in the database
    getAll: async (req: Request, res: Response) => {
        try {                 
            const x = await db.query(QueryMaker.getAll('cards'))
            res.json(x.rows);
        } catch (err) { throw err; }
    },

    addOne: async (req: Request, res: Response) => {
        try {                 
            // const x = await db.query(QueryMaker.getAll('cards'))
            res.json({"message": "One added."});
        } catch (err) { throw err; }
    },

    // UPDATE a user's note pertaining to a card
    updateOne: async (req: Request, res: Response) => {
        try {            
            // const x = await db.query( QueryMaker.getOne('colors', '_id'), [req.params.colorId]);
            // const color = new Color({...x.rows[0], ...req.body});
            // const myKeys = Object.keys(color);
            // const myVals = Object.values(color);
            // const valsAndID =  [req.params.colorId, ...myVals]
            // await db.query( QueryMaker.setOne('colors', '_id', myKeys.length, myKeys), valsAndID); 
            res.json({message: 'Note updated !!'});
        } catch (err) { throw err }; 
    },

    // DELETE a user's note pertaining to a card
    deleteOne: async (req: Request, res: Response) => {
        try {            
            // await db.query( QueryMaker.deleteOne('colors', '_id'), [req.params.colorId]);
            res.json({message: `Note deleted !!`});
        } catch (err) { throw err }; 
    }
       
    
}