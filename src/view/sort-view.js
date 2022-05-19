import AbstractView from '../framework/view/abstract-view.js';

const createSortItemTemplate = (sortValue, isChecked)=> (
  `<div class="trip-sort__item  trip-sort__item--${sortValue}">
      <input id="sort-${sortValue}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortValue}"
      ${isChecked ? 'checked' : ''} data-sort-type="${sortValue}"/>
      <label class="trip-sort__btn" for="sort-${sortValue}">${sortValue}</label>
    </div>`
);

const createSortTemplate = (sortItems) => {
  const sortItemTemplate = sortItems
    .map((sortItem, index) => createSortItemTemplate(sortItem, index === 0))
    .join('');

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortItemTemplate}
  </form>`;
};

export default class SortView  extends AbstractView {
  #sorts = null;

  constructor(sorts) {
    super();
    this.#sorts = sorts;
  }

  get template() {
    return createSortTemplate(this.#sorts);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (event) => {
    if (event.target.tagName !== 'INPUT') {
      return;
    }

    event.preventDefault();
    this._callback.sortTypeChange(event.target.dataset.sortType);
  };
}
