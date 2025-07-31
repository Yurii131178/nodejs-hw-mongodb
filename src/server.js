import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import { getEnvVar } from './utils/getEnvVar.js';
import { getAllContacts, getContactById } from './services/contacts.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(cors()); // або одразу після оголошення app !!!

  app.use(express.json());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();
    res.status(200).json({
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      res.status(404).json({
        message: 'Contact not found',
      });
      return;
    }

    res.status(200).json({
      message: 'Successfully found contact with id {contactId}!',
      data: contact,
    });
  });

  // app.get('/students/:studentId', async (req, res, next) => {
  //   const { studentId } = req.params;
  //   const student = await getStudentById(studentId);

  //   // Відповідь, якщо контакт не знайдено
  //   if (!student) {
  //     res.status(404).json({
  //       message: 'Student not found',
  //     });
  //     return;
  //   }

  //   // Відповідь, якщо контакт знайдено
  //   res.status(200).json({
  //     data: student,
  //   });
  // });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  app.use((req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });
};
