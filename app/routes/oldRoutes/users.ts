// imports and variables
import usersController from '../controllers/users-controller';
import { Router } from 'express';
const routerU = Router();

// CRUD for users info
routerU.route('/')
    .get(usersController.getAll)
    .patch(usersController.update);

routerU.route('/roleId')
    .get(usersController.returnRoleInfo)

routerU.route('/:id')
    .get(usersController.getOne);

export default routerU;