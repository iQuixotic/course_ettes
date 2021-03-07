import jwt from 'jsonwebtoken';
import db from '../config/connection';
import { QueryMaker } from '../classes';
import SECRET from '../config/secret';

// middlewares
export default {

    isFinance: (req, res, next) => {
        console.log(req.authData);
    },
    
    isAdmin: (req, res, next) => {
        console.log(req.authData);
    },

    isDefault: (req, res, next) => {
        console.log(req.authData);
    },

    isSelf: (req, res, next) => {
        console.log(req.authData);
    }
}