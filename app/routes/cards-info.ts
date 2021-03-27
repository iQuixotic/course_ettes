// imports and variables
import cardsController from '../controllers/cards-controller';
import { Router } from 'express';
const router = Router();

router.route('/')
    .get(cardsController.getAll)
    .post(cardsController.addOne)

router.route('/:cardId')
    .patch(cardsController.updateOne)
    .delete(cardsController.deleteOne);

export default router;