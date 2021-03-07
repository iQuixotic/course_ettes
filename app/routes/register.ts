// imports and variables
import { Router } from 'express';
import registerController from '../controllers/register-controller';
const routerS = Router();

// route for users to register
routerS.route('/')
    .post(registerController.addOne);
    
export default routerS;