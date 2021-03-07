// imports and variables
import colorsController from '../controllers/colors-controller';
import { Router } from 'express';
const router = Router();

router.route('/')
    .get(colorsController.getAll)
//     .post(colorsController.addOne)

// router.route('/:colorId')
//     .get(colorsController.getById)
//     .patch(colorsController.updateOne)
//     .delete(colorsController.deleteOne);

export default router;