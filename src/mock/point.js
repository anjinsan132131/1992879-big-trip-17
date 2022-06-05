import { getRandomInteger, getRandomArrayElement } from '../utils/common.js';
import { CITY_NAME, DESCRIPTION_TEXT, PHOTO_ADRESS, POINT_TYPE, MIN_PHOTO_VALUE, MAX_PHOTO_VALUE } from '../constans.js';

const MIN_PRICE_VALUE = 1;
const MAX_PRICE_VALUE = 2000;
const dataArray = [
  {
    start: '2019-07-10T22:55:56.845Z',
    end: '2019-07-11T11:22:13.375Z'
  },
  {
    start: '2019-07-10T22:58:56.845Z',
    end: '2019-07-11T11:46:13.375Z'
  },
  {
    start: '2019-07-10T22:59:56.845Z',
    end: '2019-07-11T11:58:13.375Z'
  },
];

export const generatePoint = (index) => {
  const pointType = getRandomArrayElement(POINT_TYPE);

  return {
    basePrice: getRandomInteger(MIN_PRICE_VALUE, MAX_PRICE_VALUE),
    dateFrom: dataArray[index].start,
    dateTo: dataArray[index].end,
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

