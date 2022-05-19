import { EventListView, ListEmptyView, InfoView, SortView  } from '../view';
import { render, RenderPosition } from '../framework/render.js';
import { FilterValue, SortValue } from '../constans.js';
import PointPresenter from './point-presenter';
import { updateItem } from '../util.js';

const tripMainBlock = document.querySelector('.trip-main');
const tripEventsBlock = document.querySelector('.trip-events');

export default class EventListPresenter {
  #eventListContainer = null;
  #pointsModel = null;
  #pointList = [];
  #pointPresenter = new Map();

  #eventListComponent = new EventListView();

  init = (container, pointsModel) => {
    this.#eventListContainer = container;
    this.#pointsModel = pointsModel;
    this.#pointList = [...this.#pointsModel.points];

    const listEmptyComponent = new ListEmptyView(FilterValue.Everything);
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

  #handlePointChange = (updatedPoint) => {
    this.#pointList = updateItem(this.#pointList, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#eventListComponent.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };
}
