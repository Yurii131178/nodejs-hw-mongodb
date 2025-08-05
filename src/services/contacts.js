import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

// export const updateContact = async (contactId, payload, options = {}) => {
//   const updatedContact = await ContactsCollection.findOneAndUpdate(
//     { _id: contactId },
//     payload,
//     {
//       new: true,
//       ...options,
//     },
//   );

//   if (!updatedContact) return null;

//   return {
//     contact: updatedContact,
//     isNew: false,
//   };
// };

///////////////
export const updateContact = async (contactId, payload, options = {}) => {
  const updatedContact = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true, // повертає оновлений документ
      runValidators: true, // перевірка валідності payload
      ...options,
    },
  );

  // якщо контакт не знайдено — повертаємо null
  if (!updatedContact) return null;

  return {
    contact: updatedContact,
    isNew: false, // це не новий контакт, а оновлений
  };
};
/////////////////

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
  });
  return contact;
};
