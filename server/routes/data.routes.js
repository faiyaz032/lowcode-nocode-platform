import { Router } from 'express';
import * as dataController from '../controllers/data.controller.js';
import checkIQVFields from '../middlewares/checkIQVFields.js';

const router = Router();

router.get('/data/:targetCollection/:id', checkIQVFields, dataController.getById);

router.post('/data/:targetCollection', dataController.create);
router.get('/data/:targetCollection', checkIQVFields, dataController.get);

router.patch('/data/:targetCollection/:id', dataController.updateData);
router.delete('/data/:targetCollection/:id', dataController.deleteData);

export default router;
