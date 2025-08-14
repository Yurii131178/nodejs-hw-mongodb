// import { HttpError } from 'http-errors';

// export const errorHandler = (err, req, res, next) => {
//   // Перевірка, чи отримали ми помилку від createHttpError
//   if (err instanceof HttpError) {
//     res.status(err.status).json({
//       status: err.status,
//       message: err.name,
//       data: err,
//     });
//     return;
//   }

//   res.status(500).json({
//     status: 500,
//     message: 'Something went wrong',
//     data: err.message,
//   });
// };

import createHttpError from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  console.log('Error received in errorHandler:', err);
  const { status = 500, message = 'Something went wrong', data } = err;

  res.status(status).json({
    status,
    message,
    data,
  });
};
