// imports
import { Request, Response } from 'express';
import db from '../config/connection';
import { CardInfo } from '../classes';
import { default as X } from '../utils/sql-commands'
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default {

    // GET all cards from a single deck
    getAll: async (req: Request, res: Response) => {
        try {                 
            // const x = await db.query(QueryMaker.getAll('cards'))
            // res.json(x.rows);
        } catch (err) { throw err; }
    },

    //  // CREATE a new card
     addOne: async (req: any, res: Response) => {
        try {            
            const card = new CardInfo(req.body);

            console.log(card)
            // if good data create card and assign deck, else handle error
            if(card.back_content != undefined && card.front_content != undefined) {
                await db.query(X.insertCardIntoDeck(), [card.front_content, card.back_content]); 
                await db.query(X.createCardToDeckAssoc(), [req.params.deckId]); 
            } else res.json({message: 'There were some issues. Unable to add card to the database!!'});
            res.json({message: 'New Card added to the database!!'});
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