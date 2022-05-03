import { getRandomInteger, getRandomArrayElement } from '../util.js';
import { CITY_NAME, DESCRIPTION_TEXT, PHOTO_ADRESS, POINT_TYPE } from '../constans.js';

export const generatePoint = () => {
  const pointType = getRandomArrayElement(POINT_TYPE);

  return {
    basePrice: getRandomInteger(1, 2000),
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: {
      description: getRandomArrayElement(DESCRIPTION_TEXT),
      name: getRandomArrayElement(CITY_NAME),
      pictures: [
        {
          src: `${PHOTO_ADRESS}${getRandomInteger(1, 10)}`,
          description: 'Photo description'
        }
      ]
    },
    id: 1,
    isFavorite: true,
    offers: [2],
    type: pointType
  };
};
