import { SORT_ORDER } from '../constants/index.js';

const parseSortOrder = (sortOrder) => {
  const isKnownOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder);
  if (isKnownOrder) return sortOrder;
  return SORT_ORDER.ASC;
};

export const parseSortParams = (query) => {
  const { sortOrder } = query;
  const parsedSortOrder = parseSortOrder(sortOrder);

  return {
    sortBy: 'name',
    sortOrder: parsedSortOrder,
  };
};
