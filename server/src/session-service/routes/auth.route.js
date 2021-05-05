import Router from 'express';
import * as AuthController from '../controllers';
const router = Router();

router.post('/register',AuthController.RegisterCtrl());

router.post('/login',AuthController.LoginCtrl());

router.post('/recovery-pass',AuthController.RecoverPasswordCtrl())

export default router;