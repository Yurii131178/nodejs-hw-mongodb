export const errorHandler = (err, req, res, next) => {
  console.error('Error handled:', err); // Додайте це
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
