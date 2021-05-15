import Router from 'express';
import { isAuth,isAdmin, isUserOrganization } from '../../shared/midlewares/auth.midleware';
import NotificationRepository from '../../shared/repositories/notification.repository';
import * as OrganizationController from '../controllers';
const router = Router();

let notificationRepository = new NotificationRepository();
router.post('/attend-notification/:id',[isAuth, isUserOrganization, isAdmin],OrganizationController.AttendNotificationCtrl(notificationRepository));

router.post('/cancel-attention/:id',[isAuth, isUserOrganization, isAdmin],OrganizationController.CancelAttentionCtrl(notificationRepository));

router.get('/notifications/:page',[isAuth,isAdmin,isUserOrganization],OrganizationController.ListNotificationsSavedCtrl(notificationRepository));

export default router;