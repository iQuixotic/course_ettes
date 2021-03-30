// imports and variables
import cardsController from '../controllers/cards-controller';
import { Router } from 'express';
const router = Router();

router.route('/')
    .get(cardsController.getAll);

// if post is needed later, will need to change both below routes...
router.route('/:cardId')
    .patch(cardsController.updateOne)
    .delete(cardsController.deleteOne);

router.route('/:deckId')
    .post(cardsController.addOne)
    .get(cardsController.getByDeckId);;

export default router;