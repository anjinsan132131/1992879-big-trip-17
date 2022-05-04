import { EventEditView, EventItemView, EventListView } from '../view';
import { render } from '../render.js';
import { EVENT_LIST_CLASS_CONSTANTS } from '../constans.js';

export default class EventListPresenter {
  #eventListContainer = null;
  #pointsModel = null;
  #pointList = [];

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
      this.#eventListComponent.element.replaceChild(pointComponent.element, eventEditComponent.element);
    };

    const onEscKeyDown = (event) => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        event.preventDefault();
        replaceEventEditToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.element.querySelector(`.${EVENT_LIST_CLASS_CONSTANTS.EVENT_ROLLUP_BUTTON}`).addEventListener('click', () => {
      replacePointToEventEdit();
      document.addEventListener('keydown', onEscKeyDown);
    });

    eventEditComponent.element.querySelector(`.${EVENT_LIST_CLASS_CONSTANTS.EVENT_ROLLUP_BUTTON}`).addEventListener('click', () => {
      replaceEventEditToPoint();
    });

    eventEditComponent.element.querySelector(`.${EVENT_LIST_CLASS_CONSTANTS.EVENT_EDIT}`).addEventListener('submit', (event) => {
      event.preventDefault();
      replaceEventEditToPoint();
    });

    render(pointComponent, this.#eventListComponent.element);
  };
}
