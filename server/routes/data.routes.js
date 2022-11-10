import { Router } from 'express';
import * as dataController from '../controllers/data.controller.js';
import checkPermission from '../middlewares/checkPermissions.js';
import isAuth from '../middlewares/isAuth.js';

const router = Router();

router.get('/data/:targetCollection/:id', isAuth, checkPermission, dataController.getById);

router.post('/data/:targetCollection', isAuth, checkPermission, dataController.create);
router.get('/data/:targetCollection', isAuth, checkPermission, dataController.get);

router.patch('/data/:targetCollection/:id', isAuth, checkPermission, dataController.updateData);
router.delete('/data/:targetCollection/:id', isAuth, checkPermission, dataController.deleteData);

export default router;
