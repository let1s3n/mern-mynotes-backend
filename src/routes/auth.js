import { Router } from 'express';
import * as authCtrl from '../controllers/auth.controller'

const router = Router();

router.route('/signin')
  .post(authCtrl.signin);

router.route('/signup')
  .post(authCtrl.signup);

export default router;