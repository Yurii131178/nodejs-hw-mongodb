import createHttpError from 'http-errors';

export const validateBody = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.reduce((acc, d) => {
      acc[d.context.key] = d.message;
      return acc;
    }, {});

    return next(createHttpError(400, 'Bad Request', { errors }));
  }
  next();
};
