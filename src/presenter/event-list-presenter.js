import { EventEditView, EventItemView, EventListView, ListEmptyView, InfoView, SortView  } from '../view';
import { render, RenderPosition, replace } from '../framework/render.js';
import { FilterValue, SortValue } from '../constans.js';

const tripMainBlock = document.querySelector('.trip-main');
const tripEventsBlock = document.querySelector('.trip-events');

export default class EventListPresenter {
  #eventListContainer = null;
  #pointsModel = null;
  #pointList = [];
  #isOpen = false;

  #eventListComponent = new EventListView();

  init = (container, pointsModel) => {
    this.#eventListContainer = container;
    this.#pointsModel = pointsModel;
    // this.#pointList  = [];
    this.#pointList = [...this.#pointsModel.points];

    const listEmptyComponent = new ListEmptyView(FilterValue.EVERYTHING);
    if (!this.#pointList.length) {
      render(listEmptyComponent, this.#eventListContainer);
      return;
    }

    render(new InfoView(), tripMainBlock, RenderPosition.AFTERBEGIN);
    render(new SortView(SortValue), tripEventsBlock);
    render(this.#eventListComponent, this.#eventListContainer);

    for (let i = 0; i < this.#pointList.length; i++) {
      this.#renderPoint(this.#pointList[i]);
    }
  };

  #renderPoint = (point) => {
    const pointComponent = new EventItemView(point);
    const eventEditComponent = new EventEditView(point);

    const replacePointToEventEdit = () => {
      replace(eventEditComponent, pointComponent);
    };

    const replaceEventEditToPoint = () => {
      this.#isOpen = false;
      replace(pointComponent, eventEditComponent);
    };

    const onEscKeyDown = (event) => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        event.preventDefault();
        replaceEventEditToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setClickHandler(() => {
      if (this.#isOpen) {
        return;
      }

      this.#isOpen = true;

      replacePointToEventEdit();
      document.addEventListener('keydown', onEscKeyDown);
    });

    eventEditComponent.setEditClickHandler(() => {
      replaceEventEditToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    eventEditComponent.setFormSubmitHandler(() => {
      replaceEventEditToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#eventListComponent.element);
  };
}
