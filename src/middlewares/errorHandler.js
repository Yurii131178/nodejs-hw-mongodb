// import createHttpError from 'http-errors';

// export const errorHandler = (err, req, res, next) => {
//   const { status = 500, message = 'Something went wrong', errors = [] } = err;

//   res.status(status).json({
//     status,
//     message,
//     data: {
//       errors,
//     },
//   });
// };

//////

import { HttpError } from 'http-errors';

export const errorHandler = (error, req, res, next) => {
  if (error instanceof HttpError) {
    res.status(error.status).json({
      status: error.status,
      message: error.status === 422 ? error.errors : 'Something went wrong',
      data: error.message,
    });
    return;
  }
  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: error.message,
  });
};
