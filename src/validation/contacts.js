// src/validation/сontacts.js

import Joi from 'joi';

export const createContactsSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(20)
    .required()
    .pattern(/^[a-zA-Z0-9@.-_]+$/)
    .messages({
      'string.base': 'Username should be a string',
      'string.min': 'Username should have at least {#limit} characters',
      'string.max': 'Username should have at most {#limit} characters',
      'any.required': 'Username is required',
    }),
  phoneNumber: Joi.string()
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required()
    .messages({
      'string.base': 'Phone number must be a string',
      'string.pattern.base':
        'Phone number must be in the format "(XXX) XXX-XXXX"',
      'any.required': 'Phone number is required',
    }),
  email: Joi.string()
    .email()
    .optional()
    .pattern(/^[a-zA-Z0-9@.-_]+$/)
    .messages({
      'string.email': 'Email must be a valid email address',
      'string.base': 'Email should be a string',
    }),
  isFavourite: Joi.boolean().optional().messages({
    'boolean.base': 'isFavourite must be a boolean',
  }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .optional()
    .messages({
      'string.base': 'Contact type should be a string',
      'any.only': 'Contact type must be one of "work", "home", or "personal"',
    }),
});

export const updateContactsSchema = Joi.object({
  name: Joi.string().min(3).max(20).optional(),
  phoneNumber: Joi.string().optional(),
  email: Joi.string().email().optional(),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string().valid('work', 'home', 'personal').optional(),
});
