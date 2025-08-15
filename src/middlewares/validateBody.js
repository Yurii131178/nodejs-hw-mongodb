import createHttpError from 'http-errors';

export const validateBody = (schema) => (req, res, next) => {
  console.log('Validating body:', req.body); // Додайте це
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    console.error('Validation error:', error.details); // Додайте це
    return next(
      createHttpError(400, {
        message: error.details.map((d) => d.message).join(', '),
      }),
    );
  }
  next();
};
