import { POINT_TYPE } from '../constans.js';
import { getRandomInteger } from '../utils/common.js';

const OFFERS_DATA = [
  {
    id: 1,
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    price: 120
  },
  {
    id: 2,
    title: 'Cras aliquet varius magna, non porta ligula feugiat eget.',
    price: 60
  },
  {
    id: 3,
    title: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical.',
    price: 60
  },
  {
    id: 4,
    title: 'hard McClintock, a Latin professor at Hampden-Sydney College in Virginia, lo.',
    price: 60
  },
  {
    id: 5,
    title: 'It is a long established fact that a reader will be distracted by the readable content.',
    price: 60
  },
  {
    id: 6,
    title: 'There are many variations of passages of Lorem Ipsum available.',
    price: 60
  },
  {
    id: 7,
    title: 'All the Lorem Ipsum generators on the Internet.',
    price: 60
  }
];

export const OFFERS_LIST = POINT_TYPE.map((point) => ({
  type: point,
  offers: OFFERS_DATA.slice(0, getRandomInteger(1, 8))
})
);
