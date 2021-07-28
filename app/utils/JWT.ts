import jwt from 'jsonwebtoken';
import db from '../config/connection';
import { QueryMaker } from '../classes';
import SECRET from '../config/secret';
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// __________FORMAT OF TOKEN___________
// ===========  HEADERS  =============
// Authorization: Bearer <access_token>
// ===================================
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

// middlewares
export default {

    // verify token
    verifyToken: (req, res, next) => {
        const bearerHeader = req.headers['authorization'];

        // if exists set req.token
        if(typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            req.token = bearerToken;

            // discover privileges
            next();
        } else  res.sendStatus(403);
    },
    
    // check user privileges and check for self reference
    getPrivileges: (req, res, next) => {
        jwt.verify(req.token, 'secret', async (err, authData) => {
                
                // check role_id ---- set req.authdata so I can pass
                if(err)  res.sendStatus(403);
                else req.authData = await authData;

                // get _id from user and asign reference check on req obj
                const x = await db.query(
                    QueryMaker.getOne('users', 'email'), [authData.email]);
                req.selfReference = await x.rows[0]._id
                
                // go to the route
                next();
        });
    }
}