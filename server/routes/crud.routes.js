import { Router } from 'express';
import * as crudController from '../controllers/crud.controller.js';
import checkModelExists from '../middlewares/checkModelExists.js';

const router = Router();

router.get('/crud', crudController.getAllCrudsItem);
router.post('/crud', checkModelExists, crudController.create);
router.get('/crud/:crudName', crudController.get);

router.delete('/crud/:crudName', crudController.deleteCrudItem);

export default router;
