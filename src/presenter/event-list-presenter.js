import { EventEditView, EventItemView, EventListView } from '../view';
import { render } from '../render.js';
import { EventSelector } from '../constans.js';

export default class EventListPresenter {
  #eventListContainer = null;
  #pointsModel = null;
  #pointList = [];
  #oldEventPoint = null;
  #oldEventEdit = null;

  #eventListComponent = new EventListView();

  init = (container, pointsModel) => {
    this.#eventListContainer = container;
    this.#pointsModel = pointsModel;
    this.#pointList  = [...this.#pointsModel.points];

    render(this.#eventListComponent, this.#eventListContainer);

    for (let i = 0; i < this.#pointList.length; i++) {
      this.#renderPoint(this.#pointList[i]);
    }
  };

  #renderPoint = (point) => {
    const pointComponent = new EventItemView(point);
    const eventEditComponent = new EventEditView(point);

    const replacePointToEventEdit = () => {
      this.#eventListComponent.element.replaceChild(eventEditComponent.element, pointComponent.element);
    };

    const replaceEventEditToPoint = () => {
      this.#oldEventPoint = null;
      this.#oldEventEdit = null;
      this.#eventListComponent.element.replaceChild(pointComponent.element, eventEditComponent.element);
    };

    const onEscKeyDown = (event) => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        event.preventDefault();
        replaceEventEditToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.element.querySelector(`.${EventSelector.ROLLUP}`).addEventListener('click', () => {
      if (this.#oldEventEdit && this.#oldEventPoint) {
        this.#eventListComponent.element.replaceChild(this.#oldEventPoint.element, this.#oldEventEdit.element);
      }
      this.#oldEventPoint = pointComponent;
      this.#oldEventEdit = eventEditComponent;

      replacePointToEventEdit();
      document.addEventListener('keydown', onEscKeyDown);
    });

    eventEditComponent.element.querySelector(`.${EventSelector.ROLLUP}`).addEventListener('click', () => {
      replaceEventEditToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    eventEditComponent.element.querySelector(`.${EventSelector.EDIT}`).addEventListener('submit', (event) => {
      event.preventDefault();
      replaceEventEditToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#eventListComponent.element);
  };
}
