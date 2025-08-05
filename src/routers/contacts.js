import { Router } from 'express';
import {
  getContactByIdController,
  getcontactsController,
} from '../controllers/contacts.js';

const router = Router();

router.get('/contacts', getcontactsController);

router.get('/contacts/:contactId', getContactByIdController);

export default router;
