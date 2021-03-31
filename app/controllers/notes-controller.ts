// imports
import { Request, Response } from 'express';
import db from '../config/connection';
import { Note } from '../classes';
import { default as X } from '../utils/sql-commands';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default {

    // GET all colors in the database
    // getAll: async (req: Request, res: Response) => {
    //     try {                 
    //         const x = await db.query(QueryMaker.getAll('cards'))
    //         res.json(x.rows);
    //     } catch (err) { throw err; }
    // },

    addOne: async (req: any, res: Response) => {
        try {       
            // variable deffinitions
            const x = await db.query(X.getActiveUserId(), [req.authData.email]);     
            const login_id = await x.rows[0]._id;
            const note = new Note(req.body);
            const l = await db.query(X.getCardEditRights(), [login_id, req.params.cardId])

            // if this is a card that is managed by the user
            if(l.rows.length) {
                // if good data create note with association, else handle error
                if(note.tier != undefined && note.content != undefined) {
                    await db.query(X.addUserNote(), [note.tier, note.content]); 
                    await db.query(X.addNoteToCardAssoc(), [login_id, req.params.cardId]); 
                } else res.json({message: 'New User Note can not be added!!'});
                res.json({message: 'New Note added!!'});
            } else { res.json({message: 'You do not have the priveleges to delete this card!!'}); }
        } catch (err) { throw err }; 
    },

    // UPDATE a user's note pertaining to a card
    // updateOne: async (req: Request, res: Response) => {
    //     try {            
    //         // const x = await db.query( QueryMaker.getOne('colors', '_id'), [req.params.colorId]);
    //         // const color = new Color({...x.rows[0], ...req.body});
    //         // const myKeys = Object.keys(color);
    //         // const myVals = Object.values(color);
    //         // const valsAndID =  [req.params.colorId, ...myVals]
    //         // await db.query( QueryMaker.setOne('colors', '_id', myKeys.length, myKeys), valsAndID); 
    //         res.json({message: 'Note updated !!'});
    //     } catch (err) { throw err }; 
    // },

    // // DELETE a user's note pertaining to a card
    // deleteOne: async (req: Request, res: Response) => {
    //     try {            
    //         // await db.query( QueryMaker.deleteOne('colors', '_id'), [req.params.colorId]);
    //         res.json({message: `Note deleted !!`});
    //     } catch (err) { throw err }; 
    // }
       
    
}