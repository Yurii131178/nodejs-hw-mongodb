import { CONTACT_TYPES, FAVOURITE_FILTER_VALUES } from '../constants/index.js';

const parseContactType = (contactType) => {
  if (typeof contactType !== 'string' || !CONTACT_TYPES.includes(contactType)) {
    return null;
  }
  return contactType;
};

const parseIsFavourite = (isFavourite) => {
  if (
    typeof isFavourite !== 'string' ||
    !FAVOURITE_FILTER_VALUES.includes(isFavourite)
  ) {
    return null;
  }
  return isFavourite === 'true';
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedContactType = parseContactType(contactType);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};
