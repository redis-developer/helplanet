import Router from 'express';
import { isAuth, isUserReport } from '../../shared/midlewares/auth.midleware';
import NotificationRepository from '../../shared/repositories/notification.repository';
import * as ReportController from '../controllers';
const router = Router();
let notificationRepository = new NotificationRepository();
router.post('/add',[isAuth, isUserReport],ReportController.AddNotificationCtrl(notificationRepository));

router.put('/cancel',[isAuth, isUserReport],ReportController.CancelNotificationCtrl());

export default router;