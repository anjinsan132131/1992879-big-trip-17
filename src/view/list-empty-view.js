import { createElement } from '../render.js';
import { FilterValue, ListEmptyMessages } from '../constans.js';

const createListEmptyTemplate = (filterValue) => {
  const emptyMessage = ListEmptyMessages[FilterValue[filterValue]];
  return (
    `<p class="trip-events__msg">${emptyMessage}</p>`
  );
};

export default class ListEmptyView {
  #element = null;

  constructor(filterValue) {
    this.filterValue = filterValue;
  }

  get template() {
    return createListEmptyTemplate(this.filterValue);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
