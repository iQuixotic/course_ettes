// imports and variables
import cardsController from '../controllers/cards-controller';
import { Router } from 'express';
const router = Router();

router.route('/')
    .get(cardsController.getAll);

// for right now, notice there is not a post route
// if post is needed later, will need to change both below routes...
router.route('/:cardId')
    .patch(cardsController.updateOne)
    .delete(cardsController.deleteOne);

router.route('/:deckId')
    .post(cardsController.addOne);

export default router;