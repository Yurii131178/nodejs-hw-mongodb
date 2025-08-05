import { Router } from 'express';
import {
  getContactByIdController,
  getСontactsController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getСontactsController));

router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

export default router;
