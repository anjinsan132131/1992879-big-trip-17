import AbstractView from '../framework/view/abstract-view.js';
import { FilterValue, ListEmptyMessages } from '../constans.js';

const createListEmptyTemplate = (filterValue) => {
  const emptyMessage = ListEmptyMessages[FilterValue[filterValue]];
  return (
    `<p class="trip-events__msg">${emptyMessage}</p>`
  );
};

export default class ListEmptyView extends AbstractView {
  constructor(filterValue) {
    super();
    this.filterValue = filterValue;
  }

  get template() {
    return createListEmptyTemplate(this.filterValue);
  }
}
