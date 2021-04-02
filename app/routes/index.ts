// imports and variables
import { Router } from 'express';
import path from 'path';
import MW from '../utils/JWT';
import { default as AUTH } from '../utils/authorize';
import userRoutes from './users';
import loginRoutes from './login';
import registerRoutes from './register';
import roleRoutes from './roles';
import cardInfoRoutes from './cards-info';
import colorRoutes from './colors';
import deckRoutes from './decks';
import notesRoutes from './notes';
const router = Router();

// route prefixes and middlewares called
router.use('/register', registerRoutes);
router.use('/login', loginRoutes);
router.use('/users', userRoutes);
router.use('/roles', roleRoutes);
router.use('/colors', 
    MW.verifyToken, MW.getPrivileges, AUTH.setActiveUserId,
    colorRoutes);
router.use('/decks',
    MW.verifyToken, MW.getPrivileges, AUTH.setActiveUserId,
    deckRoutes);
router.use('/card-info', 
    MW.verifyToken, MW.getPrivileges, AUTH.setActiveUserId,
    cardInfoRoutes);
router.use('/notes', 
    MW.verifyToken, MW.getPrivileges, AUTH.setActiveUserId,
    notesRoutes);

// if no routes are hit, go to react app
// router.use(function(req, res) {
//     res.sendFile(path.join(__dirname, '../../client/build'));
// });

export default router;