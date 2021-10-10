// imports and variables
import { Router } from 'express';
import colorsController from '../controllers/colors-controller';
import registerController from '../controllers/register-controller';
import loginController from '../controllers/login-controller';
import cardsController from '../controllers/cards-controller';
const routerN = Router();

// route for users to register and login
routerN.route('/register').post(registerController.addOne);
routerN.route('/login').post(loginController.login);

// color routes
routerN.route('/colors').get(colorsController.getAll)

routerN.route('/cards-info/:deckId').get(cardsController.getPublicByDeckId)

export default routerN;