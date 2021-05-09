import Router from 'express';
import { isAuth, isUserOrganization } from '../../shared/midlewares/auth.midleware';
import NotificationRepository from '../../shared/repositories/notification.repository';
import * as OrganizationController from '../controllers';
const router = Router();
let notificationRepository = new NotificationRepository();
router.post('/attend-notification',[isAuth, isUserOrganization],OrganizationController.AttendNotificationCtrl(notificationRepository));

router.put('/cancel-attention',[isAuth, isUserOrganization],OrganizationController.CancelAttentionCtrl());

export default router;