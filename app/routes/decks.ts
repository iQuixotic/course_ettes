// imports and variables
import decksController from '../controllers/decks-controller';
import { Router } from 'express';
const router = Router();

router.route('/')
    .get(decksController.getAll)
    .post(decksController.addOne)

// router.route('/:colorId')
//     .get(colorsController.getById)
//     .patch(colorsController.updateOne)
//     .delete(colorsController.deleteOne);

export default router;