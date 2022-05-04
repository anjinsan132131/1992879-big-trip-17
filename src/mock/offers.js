import { POINT_TYPE } from '../constans.js';

export const OFFERS_LIST = POINT_TYPE.map((point) => ({
  type: point,
  offers: [
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
