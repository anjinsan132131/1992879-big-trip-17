import Observable from '../framework/observable.js';
import { generatePoint } from '../mock/point.js';
import { OFFERS_LIST } from '../mock/offers.js';
import { destinationList } from '../mock/destination.js';

const POINTS_TOTAL_COUNT = 3;

export default class PointsModel extends Observable {
  #points = Array.from({length: POINTS_TOTAL_COUNT}, (elem, index) => generatePoint(index));
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

  updatePoint = (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points.splice(index, 1, update);

    this._notify(updateType, update);
  };

  addPoint = (updateType, update) => {
    this.#points.unshift(update);

    this._notify(updateType, update);
  };

  deletePoint = (updateType, id) => {
    const index = this.#points.findIndex((point) => point.id === id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points.filter((point) => point.id !== id);

    this._notify(updateType);
  };
}
