// src/routers/auth.js

import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';
import { loginUserController, registerUserController } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();

//-------register---------

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

//---------login---------

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);


export default router;
