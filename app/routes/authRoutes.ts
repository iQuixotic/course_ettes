// imports and variables
import { Router } from 'express';
import { default as AUTH } from '../utils/authorize';
const routerA = Router();
import cardsController from '../controllers/cards-controller';
import colorsController from '../controllers/colors-controller';
import decksController from '../controllers/decks-controller';
import notesController from '../controllers/notes-controller';

// card info routes
// routerP.route('/')
//     .get(cardsController.getAll);
// if post is needed later, will need to change both below routes...

routerA.route('/notes/:deckId')
    .post(notesController.addOne)
    
routerA.route('/notes/:noteId')
    .patch(notesController.updateOne)
    .delete(notesController.deleteOne);

// card routes
routerA.route('/cards-info/:cardId')
    .patch(cardsController.updateOne)
    .delete(cardsController.deleteOne);

routerA.route('/cards-info/:deckId')
    .get(AUTH.hasDeckPrivileges, cardsController.getByDeckId)
    .post(cardsController.addOne)

routerA.route('/colors/:cardId/:colorId')
    .patch(AUTH.checkPrivateCardPrivileges,  colorsController.updateOne)

// deck routes
routerA.route('/decks')
    .get(decksController.getAll)
    .post(decksController.addOne)

routerA.route('/decks/subscribed')
    .get(decksController.getSubscribedDecks)

routerA.route('/decks/owned')
    .get(decksController.getOwnedDecks)

routerA.route('/decks/owned/:deckId')
    .delete(decksController.deleteOne)

export default routerA;