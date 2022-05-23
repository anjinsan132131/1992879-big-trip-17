import { EventListView, ListEmptyView, InfoView, SortView  } from '../view';
import { render, RenderPosition } from '../framework/render.js';
import { FilterValue, SortType, SortValue } from '../constans.js';
import PointPresenter from './point-presenter';
import { updateItem } from '../utils/common.js';
import { comparePrice, compareDuration } from '../utils/sorting.js';

const tripMainBlock = document.querySelector('.trip-main');

export default class EventListPresenter {
  #eventListContainer = null;
  #pointsModel = null;
  #pointList = [];
  #pointPresenter = new Map();

  #currentSortType = SortType.DAY;
  #surcedPointList = [];

  #eventListComponent = new EventListView();
  #sortComponent = new SortView(SortValue);

  init = (container, pointsModel) => {
    this.#eventListContainer = container;
    this.#pointsModel = pointsModel;
    this.#pointList = [...this.#pointsModel.points];
    this.#surcedPointList = [...this.#pointsModel.points];

    const listEmptyComponent = new ListEmptyView(FilterValue.Everything);
    if (!this.#pointList.length) {
      render(listEmptyComponent, this.#eventListContainer);
      return;
    }

    render(new InfoView(), tripMainBlock, RenderPosition.AFTERBEGIN);
    render(this.#eventListComponent, this.#eventListContainer);

    for (let i = 0; i < this.#pointList.length; i++) {
      this.#renderPoint(this.#pointList[i]);
    }
  };

  #handlePointChange = (updatedPoint) => {
    this.#pointList = updateItem(this.#pointList, updatedPoint);
    this.#surcedPointList = updateItem(this.#surcedPointList, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.DAY:
        this.#pointList = [...this.#surcedPointList];
        break;
      case SortType.TIME:
        this.#pointList.sort(compareDuration);
        break;
      case SortType.PRICE:
        this.#pointList.sort(comparePrice);
        break;
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointsList();
    this.#pointList.forEach((point) => this.#renderPoint(point));
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#eventListContainer, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #clearPointsList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#eventListComponent.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
    this.#renderSort();
  };
}
