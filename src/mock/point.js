import { getRandomInteger, getRandomArrayElement } from '../util.js';
import { CITY_NAME, DESCRIPTION_TEXT, PHOTO_ADRESS, POINT_TYPE } from '../constans.js';

const OFFERS_LIST = POINT_TYPE.map((point) => ({
  type: point,
  services: [
    {
      id: 1,
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 120
    },
    {
      id: 2,
      title: 'Cras aliquet varius magna, non porta ligula feugiat eget.',
      price: 60
    }
  ]})
);

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
    offers: OFFERS_LIST.find(((element) => element.type === pointType)).services,
    type: pointType
  };
};
