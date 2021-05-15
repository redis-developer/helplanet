import Router from 'express';
import { isAuth } from '../../shared/midlewares/auth.midleware';
import NotificationRepository from '../../shared/repositories/notification.repository';
import * as ReportController from '../controllers';
const router = Router();

let notificationRepository = new NotificationRepository();

router.post('/add',[isAuth],ReportController.AddNotificationCtrl(notificationRepository));

router.delete('/cancel/:id',[isAuth],ReportController.CancelNotificationCtrl(notificationRepository));

router.get('/list-all/:page',[isAuth],ReportController.ListNotificationCtrl(notificationRepository));

router.get('/near/:lon/:lat',[isAuth],ReportController.ListNearNotificationsCtrl(notificationRepository));

export default router;