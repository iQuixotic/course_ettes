// imports
import { Request, Response } from 'express';
import db from '../config/connection';
import { QueryMaker, Color } from '../classes';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default {

    // GET all cards from a single deck
    getAll: async (req: Request, res: Response) => {
        try {                 
            const x = await db.query(QueryMaker.getAll('cards'))
            res.json(x.rows);
        } catch (err) { throw err; }
    },

    //  // CREATE a new card
     addOne: async (req: Request, res: Response) => {
        try {            
            // const color = new Color(req.body);
            // const myKeys = Object.keys(color);
            // const myVals = Object.values(color);
            // await db.query(QueryMaker.insertOne('colors', myKeys), myVals); 
            res.json({message: 'New Card added!!'});
        } catch (err) { throw err }; 
    },

    // UPDATE a card (must be done by deck owner)  
    updateOne: async (req: Request, res: Response) => {
        try {            
            // const x = await db.query( QueryMaker.getOne('colors', '_id'), [req.params.colorId]);
            // const color = new Color({...x.rows[0], ...req.body});
            // const myKeys = Object.keys(color);
            // const myVals = Object.values(color);
            // const valsAndID =  [req.params.colorId, ...myVals]
            // await db.query( QueryMaker.setOne('colors', '_id', myKeys.length, myKeys), valsAndID); 
            res.json({message: 'Color updated !!'});
        } catch (err) { throw err }; 
    },

    // DELETE a card (must be done by deck owner) 
    deleteOne: async (req: Request, res: Response) => {
        try {            
            // await db.query( QueryMaker.deleteOne('colors', '_id'), [req.params.colorId]);
            res.json({message: `Color deleted !!`});
        } catch (err) { throw err }; 
    }
       
    
}