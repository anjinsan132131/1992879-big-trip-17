import Observable from '../framework/observable.js';
import { FilterValue } from '../constans.js';

export default class FilterModel extends Observable {
  #filterType = FilterValue.Everything;

  get filterType() {
    return this.#filterType;
  }

  setFilterType = (updateType, filterType) => {
    this.#filterType = filterType;
    this._notify(updateType, filterType);
  };
}
