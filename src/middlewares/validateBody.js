import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  // Цей log покаже, чи middleware взагалі запускається
  console.log('--- validateBody middleware IS RUNNING ---');
  next(createHttpError(400, 'This is a test message from validateBody.'));
};
