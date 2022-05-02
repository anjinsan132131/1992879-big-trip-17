import { EventEditView, EventItemView, EventListView } from '../view';
import { render } from '../render.js';
// import { NUMBER_OF_EVENTS } from '../constans.js';

export default class EventListPresenter {
  eventListComponent = new EventListView();

  init = (container, pointsModel) => {
    this.eventListContainer = container;
    this.pointsModel = [...pointsModel.getPoints()];

    render(this.eventListComponent, container);

    render(new EventEditView(this.pointsModel[0]), this.eventListComponent.getElement());

    for (let i = 0; i < this.pointsModel.length; i++) {
      render(new EventItemView(this.pointsModel[i]), this.eventListComponent.getElement());
    }
  };
}
