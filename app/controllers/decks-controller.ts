// imports
import { Request, Response } from 'express';
import db from '../config/connection';
import { Deck } from '../classes';
import { default as X } from '../utils/sql-commands'
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default {

    // GET all decks in the database, offsetting for pagination
    getAll: async (req: Request, res: Response) => {
        try {                 
            const x = await db.query(X.getAllDecks(), [req.body.offset])
            res.json(x.rows);
        } catch (err) { throw err; }
    },

    // CREATE a new deck in the database
     addOne: async (req: any, res: Response) => {
        try {       
            // variable deffinitions
            const x = await db.query(X.getActiveUserId(), [req.authData.email]);     
            const login_id = await x.rows[0]._id;
            const deck = new Deck(req.body);

            // if good data create deck, else handle error
            if(deck.name != undefined) {
                await db.query(X.addDeckName(), [deck.name]); 
                await db.query(X.createNewDeckAssoc(), [login_id]); 
            } else res.json({message: 'New Deck can not be added!!'});
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