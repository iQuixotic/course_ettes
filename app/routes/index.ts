// imports and variables
import { Router } from 'express';
import path from 'path';
import MW from '../utils/JWT';
import userRoutes from './users';
import loginRoutes from './login';
import registerRoutes from './register';
import roleRoutes from './roles';
import cardInfoRoutes from './cards-info';
import colorRoutes from './colors';
import deckRoutes from './decks';
const router = Router();

// register and login
router.use('/register', registerRoutes);
router.use('/login', loginRoutes);

// MW is a helper object that contains middleware for validation and auth
router.use('/users', 
    // MW.verifyToken, MW.getPrivileges,
    userRoutes);

router.use('/card-info', cardInfoRoutes);
router.use('/roles', roleRoutes);
router.use('/colors', colorRoutes);
router.use('/decks',
    MW.verifyToken, MW.getPrivileges,
    deckRoutes);

// if no routes are hit, go to react app
// router.use(function(req, res) {
//     res.sendFile(path.join(__dirname, '../../client/build'));
// });

export default router;