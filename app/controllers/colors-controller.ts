// imports
import { Request, Response } from 'express';
import db from '../config/connection';
import { Color } from '../classes';
import { default as X } from '../utils/sql-commands';
import { MESSAGE, ERROR } from '../utils/messages';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default {

    // CREATE a new db entry  
    // addOne: async (req: Request, res: Response) => {
    //     try {            
    //         const color = new Color(req.body);
    //         const myKeys = Object.keys(color);
    //         const myVals = Object.values(color);
    //         await db.query(QueryMaker.insertOne('colors', myKeys), myVals); 
    //         res.json({message: 'New Color added!!'});
    //     } catch (err) { throw err }; 
    // },

    // GET all colors in the database
    getAll: async (req: Request, res: Response) => {
        try {                 
            const x = await db.query(X.getCardColors())
            res.json(x.rows);
        } catch (err) { throw err; }
    },

    // // READ a single color
    // getById: async (req: Request, res: Response) => {
    //     try {
    //         const x = await db.query(QueryMaker.getOne('colors', '_id'), [req.params.colorId]);
    //         res.json(x.rows[0]);
    //     }  catch (err) { throw err; }      
    // },

    // UPDATE a color assigned to a user's card
    updateOne: async (req: any, res: Response) => {
        try {                
            const x = await db.query(X.getColorById(), [req.params.colorId]);
            const colorById = x.rows[0];
            const color = new Color({color: colorById});

            // if good data create card and assign deck, else handle error
            if((typeof(color.color["color"]) === typeof(" "))) {
                await db.query(X.changeCardColor(), [req.params.colorId, req.activeUserId, req.params.cardId]); 
            } else res.json(MESSAGE("cardColorEditGenericFail"));
            res.json(MESSAGE("cardUpdateSuccess"));
        } catch (err) { 
            if(err.toString().includes("'color' of undefined")) res.json({error: "Color index supplied is out of bounds."})
            else res.json({error: err.toString()})
        }; 
    },

    //  // DELETE a db entry  
    //  deleteOne: async (req: Request, res: Response) => {
    //     try {            
    //         await db.query( QueryMaker.deleteOne('colors', '_id'), [req.params.colorId]);
    //         res.json({message: `Color deleted !!`});
    //     } catch (err) { throw err }; 
    // }
       
    
}