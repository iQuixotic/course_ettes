// imports and variables
import { Router } from 'express';
import path from 'path';
import MW from '../utils/JWT';
import { default as AUTH } from '../utils/authorize';
import freeRoutes from './freeRoutes';
import paidRoutes from './paidRoutes';
const router = Router();

// // /auth/ - maybe all these routes are protected and need to be logged in
// //


// // route prefixes and middlewares called
router.use('/', freeRoutes);
router.use('/p', 
    MW.verifyToken, MW.getPrivileges, AUTH.setActiveUserId, paidRoutes);

// router.use('/login', loginRoutes);
// router.use('/users', userRoutes);
// router.use('/roles', roleRoutes);
// router.use('/colors', 
//     MW.verifyToken, MW.getPrivileges, AUTH.setActiveUserId, 
//     colorRoutes);
// router.use('/decks',
//     MW.verifyToken, MW.getPrivileges, AUTH.setActiveUserId, 
//     deckRoutes);
// router.use('/card-info', 
//     MW.verifyToken, MW.getPrivileges, AUTH.setActiveUserId, 
//     cardInfoRoutes);
// router.use('/notes', 
//     MW.verifyToken, MW.getPrivileges, AUTH.setActiveUserId, 
//     notesRoutes);

// if no routes are hit, go to react app
router.use(function(req, res) {
    res.sendFile(path.join(__dirname, '../../client/build'));
});

export default router;