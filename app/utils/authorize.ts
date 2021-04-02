import jwt from 'jsonwebtoken';
import db from '../config/connection';
import { Deck, CardInfo } from '../classes';
import SECRET from '../config/secret';
import { default as X } from '../utils/sql-commands';
// middlewares
export default {
    // get and save the acive user id
    setActiveUserId: async (req, res, next) => {        
        const u = await db.query(X.getActiveUserId(), [req.authData.email]);  
        req.activeUserId = u.rows[0]._id;
        next();
    },

    // check for edit rights before continuing
    hasCardPrivileges: (req, res, next) => {

    },

    hasNotePrivileges: (req, res, next) => {

    },

    hasDeckPrivileges: async (req, res, next) => {

    }
}