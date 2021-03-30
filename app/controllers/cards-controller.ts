// imports
import { Request, Response } from 'express';
import db from '../config/connection';
import { CardInfo } from '../classes';
import { default as X } from '../utils/sql-commands'
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default {

    // GET all cards from a single deck
    getAll: async (req: any, res: Response) => {
        try {                 
            // variable deffinitions
            // const x = await db.query(X.getActiveUserId(), [req.authData.email]);  
            // const login_id = await x.rows[0]._id;
            // const y = await db.query(X.getOwnedDeck(), [login_id]);
            // const cards = y.rows
            // console.log(cards)
            
                        // if good data create deck, else handle error
                        // if(deck.name != undefined) {
                        //     await db.query(X.addDeckName(), [deck.name]); 
                        //     await db.query(X.createNewDeckAssoc(), [login_id]); 
                        // } else res.json({message: 'New Deck can not be added!!'});
        } catch (err) { throw err; }
    },

    getByDeckId: async (req: any, res: Response) => {
        try {                 
            // variable deffinitions
            const y = await db.query(X.getOwnedDeck(), [req.params.deckId]);
            const cards = y.rows

            // if good data create deck, else handle error
            if(cards.length > 0) {
               res.json( cards )
            }  else res.json({message: 'Could not get cards!!'});
        } catch (err) { throw err; }
    },

    //  CREATE a new card
    addOne: async (req: any, res: Response) => {
        try {            
            const card = new CardInfo(req.body);

            // if good data create card and assign deck, else handle error
            if(card.back_content != undefined && card.front_content != undefined) {
                await db.query(X.insertCardIntoDeck(), [card.front_content, card.back_content]); 
                await db.query(X.createCardToDeckAssoc(), [req.params.deckId]); 
            } else res.json({message: 'There were some issues. Unable to add card to the database!!'});
            res.json({message: 'New Card added to the database!!'});
        } catch (err) { throw err }; 
    },

    // UPDATE a card (must be done by deck owner)  
    updateOne: async (req: any, res: Response) => {
        try {      
            const u = await db.query(X.getActiveUserId(), [req.authData.email]);  
            let userId = u.rows[0]._id;
            const l = await db.query(X.getCardEditRights(), [userId, req.params.cardId])

            if(l.rows.length) {
                const x = await db.query(X.getCardById(), [req.params.cardId]);
                const oldCard = x.rows[0];
                const card = await new CardInfo({...oldCard, ...req.body});

                // if good data create card and assign deck, else handle error
                if(card.back_content != undefined && 
                card.front_content != undefined &&
                req.params.cardId != undefined) {
                    await db.query(X.editOwnedCard(), [card.front_content, card.back_content, req.params.cardId]); 
                } else res.json({message: 'There were some issues. Unable to process card edit at this time.'});
                res.json({message: 'Card updated !!'});
            } else { res.json({message: 'You do not have the priveleges to edit this card!!'}); }
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