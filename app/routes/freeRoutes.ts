// imports and variables
import usersController from '../controllers/users-controller';
import { Router } from 'express';
import colorsController from '../controllers/colors-controller';
import registerController from '../controllers/register-controller';
import loginController from '../controllers/login-controller';
const routerF = Router();

// route for users to register and login
routerF.route('/register')
    .post(registerController.addOne);
routerF.route('/login')
    .post(loginController.login)

// // CRUD for users info
// routerF.route('/users')
//     .get(usersController.getAll)
//     .patch(usersController.update);

// // color routes
// routerF.route('/colors')
//     .get(colorsController.getAll)
// routerF.route('/colors/:cardId/:colorId')
//     .patch(colorsController.updateOne)

// // role info
// routerF.route('/roleId')
//     .get(usersController.returnRoleInfo)
// routerF.route('/:id')
//     .get(usersController.getOne);

export default routerF;