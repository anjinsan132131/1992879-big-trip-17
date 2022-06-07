import AbstractView from '../framework/view/abstract-view.js';
import { ListEmptyMessages } from '../constans.js';
import { getUpperCaseFirstLetter } from '../utils/common.js';

const createListEmptyTemplate = (filterValue) => {
  const emptyMessage = ListEmptyMessages[getUpperCaseFirstLetter(filterValue)];
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
