import Observable from '../framework/observable.js';
import { FilterValue } from '../constans.js';

export default class FilterModel extends Observable {
  #filter = FilterValue.Everything;

  get filter() {
    return this.#filter;
  }

  setFilter = (updateType, filter) => {
    this.#filter = filter;
    this._notify(updateType, filter);
  };
}
