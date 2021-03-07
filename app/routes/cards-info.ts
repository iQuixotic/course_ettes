// imports and variables
import cardsController from '../controllers/cards-controller';
import { Router } from 'express';
const router = Router();

router.route('/')
    .get(cardsController.getAll)
//     .post(colorsController.addOne)

// router.route('/:colorId')
//     .get(colorsController.getById)
//     .patch(colorsController.updateOne)
//     .delete(colorsController.deleteOne);

export default router;