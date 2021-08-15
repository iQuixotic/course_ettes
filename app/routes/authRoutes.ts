// imports and variables
import { Router } from 'express';
import { default as AUTH } from '../utils/authorize';
const routerA = Router();
import cardsController from '../controllers/cards-controller';
import colorsController from '../controllers/colors-controller';
import decksController from '../controllers/decks-controller';

// card info routes
// routerP.route('/')
//     .get(cardsController.getAll);
// if post is needed later, will need to change both below routes...
// routerP.route('/cards-info/:cardId')
//     .patch(cardsController.updateOne)
//     .delete(cardsController.deleteOne);
routerA.route('/cards-info/:deckId')
    .get(AUTH.hasDeckPrivileges, cardsController.getByDeckId)
    .post(cardsController.addOne)

routerA.route('/colors/:cardId/:colorId')
    .patch(AUTH.checkPrivateCardPrivileges,  colorsController.updateOne)

// deck routes
routerA.route('/decks')
    .get(decksController.getAll)
    .post(decksController.addOne)
    
routerA.route('/decks/owned').get(decksController.getOwnedDecks)

export default routerA;