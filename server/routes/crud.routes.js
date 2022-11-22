import { Router } from 'express';
import * as crudController from '../controllers/crud.controller.js';
import checkCrudItemPerm from '../middlewares/checkCrudItemPerm.js';
import checkModelExists from '../middlewares/checkModelExists.js';
import isAuth from '../middlewares/isAuth.js';

const router = Router();

router.get('/crud', isAuth, crudController.getAllCrudsItem);

router.post('/crud', isAuth, checkCrudItemPerm, checkModelExists, crudController.create);

router.get('/crud/:crudName', crudController.get);

//add a new field
router.patch('/crud/:crudName/:id', isAuth, crudController.addNewField);

router.delete('/crud/:crudName', crudController.deleteCrudItem);

export default router;
