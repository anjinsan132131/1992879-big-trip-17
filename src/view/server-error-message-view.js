import AbstractView from '../framework/view/abstract-view.js';

const createServerErrorMessageTemplate = () => (
  '<p class="trip-events__msg">Server is not available now. Try later.</p>'
);

export default class ServerErrorMessageView extends AbstractView {

  get template() {
    return createServerErrorMessageTemplate();
  }
}
