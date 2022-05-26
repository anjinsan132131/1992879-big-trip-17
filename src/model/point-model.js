import { generatePoint } from '../mock/point.js';
import { OFFERS_LIST } from '../mock/offers.js';
import { destinationList } from '../mock/destination.js';

const POINTS_TOTAL_COUNT = 3;

export default class PointsModel {
  #points = Array.from({length: POINTS_TOTAL_COUNT}, generatePoint);
  #offers = OFFERS_LIST;
  #destinations = destinationList;

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }
}
