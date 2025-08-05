//Створіть у файлі src/middlewares/errorHandler.js і застосуйте в файлі src/server.js middleware errorHandler, призначений для обробки помилок у вашому Express-сервері. Цей middleware має приймати чотири аргументи. errorHandler у разі виявлення помилки має відправити клієнту відповідь зі статусом 500 та об’єкт з наступними властивостями:

export const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    message: 'Something went wrong',
    data: err.message,
  });
};
