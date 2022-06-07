import AbstractView from '../framework/view/abstract-view.js';
import { DisabledSortValue } from '../constans.js';

const createSortItemTemplate = (sortValue, isChecked)=> (
  `<div class="trip-sort__item  trip-sort__item--${sortValue}">
      <input id="sort-${sortValue}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortValue}"
      ${isChecked ? 'checked' : ''} data-sort-type="${sortValue}" ${DisabledSortValue.includes(sortValue) ? 'disabled' : ''}/>
      <label class="trip-sort__btn" for="sort-${sortValue}">${sortValue}</label>
    </div>`
);

const createSortTemplate = (sortItems, currentSortType) => {
  const sortItemTemplate = sortItems
    .map((sortItem) => createSortItemTemplate(sortItem, sortItem === currentSortType))
    .join('');

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortItemTemplate}
  </form>`;
};

export default class SortView  extends AbstractView {
  #sorts = null;
  #currentSortType = null;

  constructor(sorts, currentSortType) {
    super();
    this.#sorts = sorts;
    this.#currentSortType = currentSortType;
  }

  get template() {
    return createSortTemplate(this.#sorts, this.#currentSortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (event) => {
    event.preventDefault();
    this._callback.sortTypeChange(event.target.dataset.sortType);
  };
}
