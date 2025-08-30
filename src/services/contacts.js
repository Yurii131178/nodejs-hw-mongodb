import { SORT_ORDER } from '../constants/index.js';
import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = 'name',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  // базовий фільтр завжди включає userId
  const query = { userId };

  if (filter.contactType) {
    query.contactType = filter.contactType;
  }

  // if (filter.isFavourite !== undefined) {
  //   query.isFavourite = filter.isFavourite; // сomment trouble
  // }

  if (typeof filter.isFavourite === 'boolean') { // add solution
 query.isFavourite = filter.isFavourite;
 }


  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.countDocuments(query),
    ContactsCollection.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, page, perPage);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
  const contact = await ContactsCollection.findOne({_id: contactId, userId});
  return contact;
};

// export const createContact = async (payload, userId) => {
//   const contact = await ContactsCollection.create({...payload, userId});
//   return contact;
// };

/////////////////// !!!!!!!!!!!!!!тест на причину відсутності контакта в базі даних через try..catch !!!!!!!!!!!!!

export const createContact = async (payload, userId) => {
  try {
    const contact = await ContactsCollection.create({...payload, userId});
    return contact;
  } catch (error) {
    console.error('Error saving contact:', error);
    throw error;
  }
};

/////////////////



export const updateContact = async (contactId, payload, userId) => {
  const updatedContact = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    { new: true },
  );
  return updatedContact;
};

export const deleteContact = async (contactId, userId) => {
  const deletedContact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return deletedContact;
};
