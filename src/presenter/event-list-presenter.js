import EventEditView from '../view/event-edit-view';
import EventItemView from '../view/event-item-view';
import EventListView from '../view/event-list-view';
import { render } from '../render.js';

export default class EventListPresenter {
  eventListComponent = new EventListView();

  init = (container) => {
    this.eventListContainer = container;

    render(this.eventListComponent, container);

    render(new EventEditView(), this.eventListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new EventItemView(), this.eventListComponent.getElement());
    }
  };
}
