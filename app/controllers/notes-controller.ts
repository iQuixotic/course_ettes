// imports
import { Request, Response } from 'express';
import db from '../config/connection';
import { Note } from '../classes';
import { default as X } from '../utils/sql-commands';
import MESSAGES  from '../utils/messages'
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default {

    addOne: async (req: any, res: Response) => {
        try {       
            const note = new Note(req.body);
            const l = await db.query(X.getCardEditRights(), [req.activeUserId, req.params.cardId])

            // if this is a card that is managed by the user
            if(l.rows.length) {
                // if good data create note with association, else handle error
                if(note.tier != undefined && note.content != undefined) {
                    await db.query(X.addUserNote(), [note.tier, note.content]); 
                    await db.query(X.addNoteToCardAssoc(), [req.activeUserId, req.params.cardId]); 
                } else res.json({message: 'New User Note can not be added!!'});
                res.json({message: 'New Note added!!'});
            } else { res.json({message: 'You do not have the priveleges to delete this card!!'}); }
        } catch (err) { throw err }; 
    },

    // UPDATE a user's note pertaining to a card
    updateOne: async (req: any, res: Response) => {
        try {       
            // const note = new Note(req.body);
            const l = await db.query(X.getCardEditRights(), [req.activeUserId, req.params.cardId])

            // if this is a card that is managed by the user
            if(l.rows.length) {
                const x = await db.query(X.getNoteById(), [req.params.noteId]);
                const oldNote = x.rows[0];
                const note = await new Note({...oldNote, ...req.body});
                // if good data create note with association, else handle error
                if(note.tier != undefined && 
                   note.content != undefined &&
                   req.params.noteId != undefined) {
                    await db.query(X.editUserNote(), [note.content, req.params.noteId]); 
                    // await db.query(X.addNoteToCardAssoc(), [login_id, req.params.cardId]); 
                } else res.json(MESSAGES("invalidNoteDeff"));
            res.json(MESSAGES("noteUpdate"));
            } else { res.json(MESSAGES("noteUpdatePriveleges")); }
        } catch (err) { throw err }; 
    },

    // DELETE a user's note pertaining to a card
    deleteOne: async (req: any, res: Response) => {
        try {
            const l = await db.query(X.getCardEditRights(), [req.activeUserId, req.params.cardId])

            // if this is a card that is managed by the user
            if(l.rows.length) {
                await db.query(X.deleteUserNote(), [req.params.noteId]); 
                res.json(MESSAGES("noteDelete"));
            } else { res.json(MESSAGES("improperNotePriveleges")); }
        } catch (err) { throw err }; 
    }
       
    
}