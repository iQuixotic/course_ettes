// imports
import { Request, Response } from 'express';
import db from '../config/connection';
import { CardInfo } from '../classes';
import { default as X } from '../utils/sql-commands';
import { MESSAGE } from '../utils/messages';
import databaseHelper from '../utils/database-helper';
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
            
            //             if good data create deck, else handle error
            //             if(deck.name != undefined) {
            //                 await db.query(X.addDeckName(), [deck.name]); 
            //                 await db.query(X.createNewDeckAssoc(), [login_id]); 
            //             } else res.json({message: 'New Deck can not be added!!'});
        } catch (err) { throw err; }
    },

    getPrivateByDeckId: async (req: any, res: Response) => {
        try {                 
            const y = await db.query(X.getOwnedDeck(), [req.params.deckId]);
            const cards = y.rows

            // if good data get deck, else handle error
            if(cards.length > 0) res.json( cards )
            else if (cards.length === 0) res.status(200).json({message: "There are no cards in this deck"})
            else res.status(500); res.json(MESSAGE("generalCardError"));
        } catch (err) { res.json({error: err.toString()}) }
    },

    getPublicByDeckId: async (req: any, res: Response) => {
        try {                 
            const y = await db.query(X.getPublicDeck(), [req.params.deckId]);
            const cards = y.rows

            // if good data get deck, else handle error
            if(cards.length > 0) res.json( cards )
            else if (cards.length === 0) res.status(200).json({message: "There are no cards in this deck"})
            else res.status(500); res.json(MESSAGE("generalCardError"));
        } catch (err) { res.json({error: err.toString()}) }
    },

    //  CREATE a new card
    addOne: async (req: any, res: Response) => {
        try {            
            const card = new CardInfo(req.body);
            console.log(req.body)
            // if good data create card and assign deck, else handle error
            if(card.back_content != undefined && card.front_content != undefined) {
                let id = databaseHelper.createUniqueId()
                // I need some way here to check the req.params.deckId
                await db.query(X.insertCardIntoDeck(), [id, card.front_content, card.back_content]); 
                await db.query(X.createCardToDeckAssoc(), [id, req.params.deckId]); 
                await db.query(X.createColorAssoc(), [req.activeUserId, id]);
            } else res.json(MESSAGE("cardAddError"));
            res.json(MESSAGE("cardAdd"));
        } catch (err) {
            console.log(err)
            if(err.detail === undefined) res.status(500).json({error: "There was an issue with the submitted data."})
            if(err.detail.includes(`(deck_id)=(${req.params.deckId}) is not present in table \"decks\"`)) res.status(500).json({error: "Deck Id out of range"});
            else res.status(500).json({error: err.detail});          
        }; 
    },

    // UPDATE a card (must be done by deck owner)  
    updateOne: async (req: any, res: Response) => {
        try {      
            const l = await db.query(X.getCardEditRights(), [req.activeUserId, req.params.cardId])
            if(l.rows.length) {
                const x = await db.query(X.getCardById(), [req.params.cardId]);
                const oldCard = x.rows[0];
                const card = await new CardInfo({...oldCard, ...req.body});

                // if good data create card and assign deck, else handle error
                if(card.back_content != undefined && 
                card.front_content != undefined &&
                req.params.cardId != undefined) {
                    await db.query(X.editOwnedCard(), [card.front_content, card.back_content, req.params.cardId]); 
                } else res.json(MESSAGE("cardUpdateError"));
                res.json(MESSAGE("cardUpdated"));
            } else { res.status(401); res.json(MESSAGE("cardUpdatePrivileges")); }
        } catch (err) { throw err }; 
    },

    // DELETE a card (must be done by deck owner) 
    deleteOne: async (req: any, res: Response) => {
        try {
            const l = await db.query(X.getCardEditRights(), [req.activeUserId, req.params.cardId])
            // if this is a card that is managed by the user
            if(l.rows.length) {
                // const x = await db.query(X.getCardById(), [req.params.cardId]);
                // const oldCard = x.rows[0];
                // const card = await new CardInfo({...oldCard, ...req.body});
                await db.query(X.deleteOwnedCard(), [req.params.cardId]); 
                res.json(MESSAGE("cardRemoved"));
            } else { res.json(MESSAGE("cardRemovedError")); }
        } catch (err) { throw err }; 
    }    
}