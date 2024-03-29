// imports and variables
import { Router } from 'express';
import { default as AUTH } from '../utils/authorize';
const routerA = Router();
import cardsController from '../controllers/cards-controller';
import colorsController from '../controllers/colors-controller';
import decksController from '../controllers/decks-controller';
import notesController from '../controllers/notes-controller';

// deck routes
routerA.post('/notes/:deckId', notesController.addOne)
    
routerA.route('/notes/:noteId')
    .patch(notesController.updateOne)
    .delete(notesController.deleteOne);

// card routes
routerA.route('/cards-info/:cardId')
    .patch(cardsController.updateOne)
    .delete(cardsController.deleteOne);

routerA.route('/cards-info/:deckId')
    .get(AUTH.hasDeckPrivileges, cardsController.getPrivateByDeckId)
    .post(cardsController.addOne)

routerA.get('/colors/:cardId/:colorId', 
    // AUTH.checkPrivateCardPrivileges,   // I will have to fix this one later...
    colorsController.updateOne)

// deck routes
routerA.route('/decks')
    .get(decksController.getAll)
    .post(decksController.addOne)

routerA.route('/decks/subscribed')
    .get(decksController.getSubscribedDecks)
    .post(decksController.addToSubscribedDecks)

routerA.get('/decks/owned', decksController.getOwnedDecks)
routerA.delete('/decks/owned/:deckId', decksController.deleteOne)

// routerA.route('/color-card')
//     .patch(colorsController.updateOne)

export default routerA;