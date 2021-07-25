// imports and variables
import { Router } from 'express';
const routerP = Router();
import cardsController from '../controllers/cards-controller';

// card info routes
routerP.route('/')
    .get(cardsController.getAll);
// if post is needed later, will need to change both below routes...
routerP.route('/cards-info/:cardId')
    .patch(cardsController.updateOne)
    .delete(cardsController.deleteOne);
routerP.route('/cards-info/:deckId')
    .post(cardsController.addOne)
    .get(cardsController.getByDeckId);

export default routerP;