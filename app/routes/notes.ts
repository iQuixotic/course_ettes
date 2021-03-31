// imports and variables
import notesController from '../controllers/notes-controller';
import { Router } from 'express';
const router = Router();

router.route('/:cardId')
    // .get(notesController.getAll)
    .post(notesController.addOne)

router.route('/:deckId')
    // .get(notesController.getAll)
    
// router.route('/:noteId')
//     .put(notesController.updateOne)
//     .delete(notesController.deleteOne)

export default router;