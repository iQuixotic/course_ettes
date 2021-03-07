import rolesController from '../controllers/roles-controller';
import { Router } from 'express';
const router = Router();

router.route('/')
    .get(rolesController.getAll)
    .post(rolesController.addOne)

router.route('/:roleId')
    .get(rolesController.getById)
    .patch(rolesController.updateOne)
    .delete(rolesController.deleteOne);

export default router;