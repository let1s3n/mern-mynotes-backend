import {Router} from 'express';
import usersCtrl from '../controllers/users.controllers';
import {authJwt} from '../middlewares' 

const router = Router();
const { getUsers, getUser,createUser, updateUser, deleteUser } = usersCtrl;

router.route('/')
  .get(authJwt.verifyToken,getUsers)
  .post([authJwt.verifyToken,authJwt.isModerator],createUser)

router.route('/:id')
  .get(authJwt.verifyToken,getUser)
  .put([authJwt.verifyToken,authJwt.isModerator],updateUser)
  .delete([authJwt.verifyToken,authJwt.isModerator],deleteUser)


export default router;