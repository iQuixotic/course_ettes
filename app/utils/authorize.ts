import jwt from 'jsonwebtoken';
import db from '../config/connection';
import { Deck, CardInfo } from '../classes';
import SECRET from '../config/secret';
import { default as X } from '../utils/sql-commands';
import { MESSAGE } from '../utils/messages';
// middlewares
export default {
    // get and save the acive user id
    setActiveUserId: async (req, res, next) => {        
        const u = await db.query(X.getActiveUserId(), [req.authData.email]);  
        req.activeUserId = u.rows[0]._id;
        next();
    },

    checkActiveUserId: () => {

    },

    checkPrivateCardPrivileges: async (req, res, next) => {
        const l = await db.query(X.getPersonalCardEditRights(), [req.activeUserId, req.params.cardId])
        console.log(l.rows)
        if(l.rows.length > 0) next();
        else res.json({message: MESSAGE("cardPrivelegeMessage")});
    },

    hasNotePrivileges: (req, res, next) => {

    },

    hasDeckPrivileges: async (req, res, next) => {

    }
}