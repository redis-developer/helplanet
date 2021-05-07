import Router from 'express';
import { isAuth } from '../../shared/midlewares/auth.midleware';
import UserRepository from '../../shared/repositories/user.repository';
import * as AuthController from '../controllers';
const router = Router();
let userRepository = new UserRepository();
router.post('/register',AuthController.RegisterCtrl(userRepository));

router.post('/login',AuthController.LoginCtrl(userRepository));

router.get('/logout',[isAuth],AuthController.LogoutCtrl())

router.post('/recovery-pass',AuthController.RecoverPasswordCtrl(userRepository))

export default router;