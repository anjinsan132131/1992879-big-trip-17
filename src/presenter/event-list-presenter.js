import EventEditView from '../view/event-edit-view';
import EventItemView from '../view/event-item-view';
import EventListView from '../view/event-list-view';
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
