// imports
import { Request, Response } from 'express';
import db from '../config/connection';
import { Note } from '../classes';
import { default as X } from '../utils/sql-commands';
import { MESSAGE } from '../utils/messages';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default {

    addOne: async (req: any, res: Response) => {
        try {       
            const note = new Note(req.body);
            const l = await db.query(X.getNoteAddRights(), [req.activeUserId, req.params.deckId])
            
            // if this is a card that is managed by the user
            if(l.rows.length) {
                // if good data create note with association, else handle error
                if(note.content != undefined) {
                    await db.query(X.addUserNote(), [req.activeUserId, req.params.deckId, note.content]); 
                    // await db.query(X.addNoteToCardAssoc(), [req.activeUserId, req.params.cardId]); 
                } else res.json(MESSAGE("invalidNoteDeff"));
                res.json(MESSAGE("noteForCardAdd"));
            } else { res.status(403); res.json(MESSAGE("noteDeletePrivileges")); }
        } catch (err) { throw err }; 
    },

    // UPDATE a user's note pertaining to a card
    updateOne: async (req: any, res: Response) => {
        try {       
            // const note = new Note(req.body);
            const l = await db.query(X.getNoteEditRights(), [req.activeUserId, req.params.noteId])

            // if this is a card that is managed by the user
            if(l.rows.length) {
                const x = await db.query(X.getNoteById(), [req.params.noteId]);
                const oldNote = x.rows[0];
                const note = await new Note({...oldNote, ...req.body});
                // if good data create note with association, else handle error
                if(note.content != undefined &&
                   req.params.noteId != undefined) {
                    await db.query(X.editUserNote(), [note.content, req.params.noteId]); 
                    // await db.query(X.addNoteToCardAssoc(), [login_id, req.params.cardId]); 
                } else res.json(MESSAGE("invalidNoteDeff"));
            res.json(MESSAGE("noteUpdate"));
            } else { res.json(MESSAGE("noteUpdatePriveleges")); }
        } catch (err) { throw err }; 
    },

    // DELETE a user's note pertaining to a card
    deleteOne: async (req: any, res: Response) => {
        try {
            const l = await db.query(X.getNoteEditRights(), [req.activeUserId, req.params.noteId])

            // if this is a card that is managed by the user
            if(l.rows.length) {
                await db.query(X.deleteUserNote(), [req.params.noteId]); 
                res.json(MESSAGE("noteDelete"));
            } else { res.json(MESSAGE("improperNotePriveleges")); }
        } catch (err) { throw err }; 
    }
       
    
}