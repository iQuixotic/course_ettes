// imports and variables
import { Router } from 'express';
import path from 'path';
import MW from '../utils/JWT';
import { default as AUTH } from '../utils/authorize';
import noAuthRoutes from './noAuthRoutes';
import authRoutes from './authRoutes';
const router = Router();

// // route prefixes and middlewares called
router.use('/', noAuthRoutes);
router.use('/ua/', MW.verifyToken, MW.getPrivileges, AUTH.setActiveUserId, authRoutes);

// if no routes are hit, go to react app
router.use(function(req, res) {
    res.sendFile(path.join(__dirname, '../../client/build'));
});

export default router;