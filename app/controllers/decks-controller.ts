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

    // CREATE a new deck
     addOne: async (req: Request, res: Response) => {
        try {            
            // const color = new Color(req.body);
            // const myKeys = Object.keys(color);
            // const myVals = Object.values(color);
            // await db.query(QueryMaker.insertOne('colors', myKeys), myVals); 
            res.json({message: 'New Deck added!!'});
        } catch (err) { throw err }; 
    },

    // READ a single deck which a user owns
    getOwnedDecks: async (req: Request, res: Response) => {
        try {
            // const x = await db.query(QueryMaker.getOne('colors', '_id'), [req.params.colorId]);
            // res.json(x.rows[0]);
        }  catch (err) { throw err; }      
    },

    // READ a single deck to which a user is subscribed to
    getSubscribedDecks: async (req: Request, res: Response) => {
        try {
            // const x = await db.query(QueryMaker.getOne('colors', '_id'), [req.params.colorId]);
            // res.json(x.rows[0]);
        }  catch (err) { throw err; }      
    },

    // DELETE an entire deck owned by a user
    deleteOne: async (req: Request, res: Response) => {
        try {            
            // await db.query( QueryMaker.deleteOne('colors', '_id'), [req.params.colorId]);
            res.json({message: `Deck deleted !!`});
        } catch (err) { throw err }; 
    }
       
    
}