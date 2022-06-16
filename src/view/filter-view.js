import AbstractView from '../framework/view/abstract-view.js';
import { FilterValue } from '../constans.js';

const createFilterItemTemplate = (filter, currentFilterType, filtersCount) => (
  `<div class="trip-filters__filter">
    <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio"
      ${filter === currentFilterType ? 'checked' : ''}
      ${filtersCount[filter.toLowerCase()] === 0 ? 'disabled' : ''}
      name="trip-filter" value="${filter}">
    <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
  </div>`
);

const createFilterTemplate = (currentFilterType, filtersCount) => {
  const filterItemsTemplate = Object.keys(FilterValue)
    .map((filter) => createFilterItemTemplate(filter, currentFilterType, filtersCount))
    .join('');

  return `<form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
  </form>`;
};

export default class FilterView extends AbstractView  {
  #currentFilter = null;
  #filtersCount = null;

  constructor(currentFilterType, filtersCount) {
    super();
    this.#currentFilter = currentFilterType;
    this.#filtersCount = filtersCount;
  }

  get template() {
    return createFilterTemplate(this.#currentFilter, this.#filtersCount);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange((evt.target.value).toLowerCase());
  };

}
