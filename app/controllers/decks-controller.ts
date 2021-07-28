// imports
import { Request, Response } from 'express';
import db from '../config/connection';
import { Deck } from '../classes';
import { default as X } from '../utils/sql-commands';
import { MESSAGE } from '../utils/messages';
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
            const deck = new Deck(req.body);

            // if good data create deck, else handle error
            if(deck.name != undefined) {
                await db.query(X.addDeckName(), [deck.name]); 
                await db.query(X.createNewDeckAssoc(), [req.activeUserId]); 
            } else res.json(MESSAGE("deckDeffError"));
            res.json(MESSAGE("deckAdded"));
        } catch (err) { throw err }; 
    },

    // READ a single deck which a user owns and manages
    getOwnedDecks: async (req: any, res: Response) => {
        try {
            // variable deffinitions
            // const deck = new Deck(req.body);
            const y = await db.query(X.getAllOwnedDecks(), [req.activeUserId])
            const usersDecks = y.rows

            // if good data get owned decks, else handle error
            if(usersDecks.length > 0) {
                res.json(usersDecks);
            } else res.json(MESSAGE("cannotGetOwnedDecks"));
            // res.json({message: usersDecks});
        }  catch (err) { throw err; }      
    },

    // READ a single deck to which a user is subscribed to
    getSubscribedDecks: async (req: any, res: Response) => {
        try {
            // variable deffinitions
            // const deck = new Deck(req.body);
            const y = await db.query(X.getUserDeckLibrary(), [req.activeUserId])
            const usersDecks = y.rows

            // if good data get subscribed decks, else handle error
            if(usersDecks.length > 0) {
                res.json(usersDecks);
            } else res.json(MESSAGE("cannotGetSubscribedDecks"));
            // res.json({message: usersDecks});
        }  catch (err) { throw err; }       
    },

    // DELETE an entire deck owned by a user
    deleteOne: async (req: any, res: Response) => {
        try {            

        
        } catch (err) { throw err }; 
    }
       
    
}