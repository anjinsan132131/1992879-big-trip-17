import { EventEditView, EventItemView, EventListView } from '../view';
import { render } from '../render.js';
import { NUMBER_OF_EVENTS } from '../constans.js';

export default class EventListPresenter {
  eventListComponent = new EventListView();

  init = (container) => {
    this.eventListContainer = container;

    render(this.eventListComponent, container);

    render(new EventEditView(), this.eventListComponent.getElement());

    for (let i = 0; i < NUMBER_OF_EVENTS; i++) {
      render(new EventItemView(), this.eventListComponent.getElement());
    }
  };
}
