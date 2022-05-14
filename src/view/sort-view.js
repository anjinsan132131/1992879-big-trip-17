import AbstractView from '../framework/view/abstract-view.js';

const createSortItemTemplate = ({name, isChecked})=> (
  `<div class="trip-sort__item  trip-sort__item--${name}">
      <input id="sort-${name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${name}" ${isChecked ? 'checked' : ''}/>
      <label class="trip-sort__btn" for="sort-${name}" data-sort-type="${name}">${name}</label>
    </div>`
);

const createSortTemplate = (sortItems) => {
  const sortItemTemplate = sortItems
    .map((sort) => createSortItemTemplate(sort))
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
}
