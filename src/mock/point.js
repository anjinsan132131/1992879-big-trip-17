import { getRandomInteger, getRandomArrayElement } from '../util.js';
import { CITY_NAME, DESCRIPTION_TEXT, PHOTO_ADRESS, POINT_TYPE } from '../constans.js';

const MIN_PRICE_VALUE = 1;
const MAX_PRICE_VALUE = 2000;
const MIN_PHOTO_VALUE = 1;
const MAX_PHOTO_VALUE = 10;

export const generatePoint = () => {
  const pointType = getRandomArrayElement(POINT_TYPE);

  return {
    basePrice: getRandomInteger(MIN_PRICE_VALUE, MAX_PRICE_VALUE),
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: {
      description: getRandomArrayElement(DESCRIPTION_TEXT),
      name: getRandomArrayElement(CITY_NAME),
      pictures: [
        {
          src: `${PHOTO_ADRESS}${getRandomInteger(MIN_PHOTO_VALUE, MAX_PHOTO_VALUE)}`,
          description: 'Photo description'
        }
      ]
    },
    id: Math.floor(new Date().valueOf() * Math.random()).toString(),
    isFavorite: true,
    offers: [2],
    type: pointType
  };
};
