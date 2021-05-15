import Router from 'express';
import { isAuth, isUserOrganization } from '../../shared/midlewares/auth.midleware';
import NotificationRepository from '../../shared/repositories/notification.repository';
import * as OrganizationController from '../controllers';
const router = Router();

let notificationRepository = new NotificationRepository();
router.post('/attend-notification/:id',[isAuth, isUserOrganization],OrganizationController.AttendNotificationCtrl(notificationRepository));

router.post('/cancel-attention/:id',[isAuth, isUserOrganization],OrganizationController.CancelAttentionCtrl(notificationRepository));

router.get('/notifications',[isAuth],OrganizationController.ListNotificationsSavedCtrl(notificationRepository));

export default router;