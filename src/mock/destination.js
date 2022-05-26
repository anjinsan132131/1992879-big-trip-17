import { getRandomInteger, getRandomArrayElement } from '../utils/common.js';
import { DESCRIPTION_TEXT, PHOTO_ADRESS, MIN_PHOTO_VALUE, MAX_PHOTO_VALUE } from '../constans.js';

export const destinationList = [
  {
    description: getRandomArrayElement(DESCRIPTION_TEXT),
    name: 'Chamonix',
    pictures: [
      {
        src: `${PHOTO_ADRESS}${getRandomInteger(MIN_PHOTO_VALUE, MAX_PHOTO_VALUE)}`,
        description: 'Photo description'
      }
    ]
  },
  {
    description: getRandomArrayElement(DESCRIPTION_TEXT),
    name: 'Amsterdam',
    pictures: [
      {
        src: `${PHOTO_ADRESS}${getRandomInteger(MIN_PHOTO_VALUE, MAX_PHOTO_VALUE)}`,
        description: 'Photo description'
      }
    ]
  },
  {
    description: getRandomArrayElement(DESCRIPTION_TEXT),
    name: 'Geneva',
    pictures: [
      {
        src: `${PHOTO_ADRESS}${getRandomInteger(MIN_PHOTO_VALUE, MAX_PHOTO_VALUE)}`,
        description: 'Photo description'
      }
    ]
  }
];
