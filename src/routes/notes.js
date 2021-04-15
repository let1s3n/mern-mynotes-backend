import {Router} from 'express'
import notesCtrl from '../controllers/notes.controller'
import {authJwt} from '../middlewares' 

const router = Router();
const { getNotes,createNote,getNote,updateNote,deleteNote } = notesCtrl;
router.route('/')
  .get(authJwt.verifyToken,getNotes)
  .post([authJwt.verifyToken],createNote)


router.route('/:id')
  .get(authJwt.verifyToken,getNote)
  .put([authJwt.verifyToken,authJwt.isModerator],updateNote)
  .delete([authJwt.verifyToken,authJwt.isModerator],deleteNote)

export default router;