import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const { type, name } = filter;

  return (
    `<div class="trip-filters__filter">
    <input id="filter-${name.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio"
    ${type === currentFilterType ? 'checked' : ''}
      name="trip-filter" value="${name.toLowerCase()}">
    <label class="trip-filters__filter-label" for="filter-${name.toLowerCase()}">${name}</label>
  </div>`
  );
};

const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  return `<form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
  </form>`;
};

export default class FilterView extends AbstractView  {
  #filters = null;
  #currentFilter = null;

  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  };

}
