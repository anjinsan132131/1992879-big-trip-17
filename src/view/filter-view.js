import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTemplate = (filterValue) => (
  `<div class="trip-filters__filter">
    <input id="filter-${filterValue.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterValue.toLowerCase()}">
    <label class="trip-filters__filter-label" for="filter-${filterValue.toLowerCase()}">${filterValue}</label>
  </div>`
);

const createFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter))
    .join('');

  return `<form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
  </form>`;
};

export default class FilterView extends AbstractView  {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
