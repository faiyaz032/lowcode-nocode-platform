import { Router } from 'express';
import * as dataController from '../controllers/data.controller.js';

const router = Router();

router.get('/data/:targetCollection/:id', dataController.getById);
router.post('/data/:targetCollection', dataController.create);
router.get('/data/:targetCollection', dataController.get);

export default router;
