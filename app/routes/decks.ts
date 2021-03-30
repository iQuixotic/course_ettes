// imports and variables
import decksController from '../controllers/decks-controller';
import { Router } from 'express';
const router = Router();

router.route('/')
    .get(decksController.getAll)
    .post(decksController.addOne)

router.route('/subscribed')
    .get(decksController.getSubscribedDecks)

router.route('/owned')
    .get(decksController.getOwnedDecks)

router.route('/owned/:deckId')
    .delete(decksController.deleteOne)

export default router;