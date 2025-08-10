import { Router } from 'express';
import {
  createContactsController,
  deleteContactController,
  getContactByIdController,
  getContactsController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactsSchema,
  updateContactsSchema,
} from '../validation/contacts.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

router.post(
  '/contacts',
  validateBody(createContactsSchema),
  ctrlWrapper(createContactsController),
);

router.patch(
  '/contacts/:contactId',
  validateBody(updateContactsSchema),
  ctrlWrapper(patchContactController),
);

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default router;
