import { Router } from 'express';
import * as crudController from '../controllers/crud.controller.js';
import checkModelExists from '../middlewares/checkModelExists.js';

const router = Router();

router.post('/crud', checkModelExists, crudController.create);
router.get('/crud/:crudName', crudController.get);

export default router;
