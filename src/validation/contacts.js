import Joi from 'joi';
import { CONTACT_TYPES } from '../constants/index.js';

export const createContactsSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  phoneNumber: Joi.string().required().messages({
    'string.base': 'phone number should be a string',
    'any.required': 'Phone number is required',
  }),
  email: Joi.string().email().optional().messages({
    'string.email': 'Email must be a valid email address',
    'string.base': 'Email should be a string',
  }),
  isFavourite: Joi.boolean().optional().messages({
    'boolean.base': 'isFavourite must be a boolean',
  }),
  contactType: Joi.string()
    .valid(...CONTACT_TYPES)
    .default('personal')
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
  contactType: Joi.string()
    .valid(...CONTACT_TYPES)
    .optional(),
}).min(1);

const dataToValidate = {
  name: 'Abracadabra',
  phoneNumber: '+421 910 99 99 99 10',
  email: 'abra@mail.com',
  isFavourite: false,
  contactType: 'home',
};

//Важливо вказати { abortEarly: false } при виклику методу validate, щоб отримати всі можливі помилки валідації, а не першу з них:
const validationResult = createContactsSchema.validate(dataToValidate, {
  abortEarly: false,
});

if (validationResult.error) {
  console.error(validationResult.error.message);
} else {
  console.log('Data is valid!');
}
