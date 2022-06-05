import { EventListView, ListEmptyView, InfoView, SortView  } from '../view';
import { render, RenderPosition, remove } from '../framework/render.js';
import { SortType, SortValue, UserAction, UpdateType, FilterValue} from '../constans.js';
import PointPresenter from './point-presenter.js';
import PointNewPresenter from './point-new-presenter.js';
import { sortByPrice, sortByDuration, sortByDay } from '../utils/sorting.js';
import { filter } from '../utils/filter.js';

const tripMainBlock = document.querySelector('.trip-main');

export default class TripPresenter {
  #eventListContainer = null;
  #pointsModel = null;
  #pointNewPresenter = null;
  #pointPresenterMap = new Map();
  #filterModel = null;

  #currentSortType = SortType.DAY;
  #offers = [];
  #destinations = [];

  #eventListComponent = new EventListView();
  #infoComponent = new InfoView();
  #listEmptyComponent = null;
  #sortComponent = null;

  constructor(container, pointsModel, filterModel) {
    this.#eventListContainer = container;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#offers = [...this.#pointsModel.offers];
    this.#destinations = [...this.#pointsModel.destinations];

    this.#pointNewPresenter = new PointNewPresenter(this.#eventListComponent.element, this.#handleViewAction, this.#destinations, this.#offers);

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortByDay);
      case SortType.TIME:
        return filteredPoints.sort(sortByDuration);
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
    }
    return filteredPoints;
  }

  init = () => {
    this.#renderTrip();
  };

  createPoint = (callback) => {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterValue.Everything);
    this.#pointNewPresenter.init(callback);
  };

  #handleModeChange = () => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenterMap.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenterMap.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearPointList();
        this.#renderPoints();
        break;
      case UpdateType.MAJOR:
        this.#clearTrip();
        this.#renderTrip(true);
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPointList();
    this.#renderPoints();
  };

  #clearPointList = () => {
    this.#pointPresenterMap.forEach((presenter) => presenter.destroy());
    this.#pointPresenterMap.clear();
  };

  #clearTrip = (resetSortType = false) => {
    this.#clearPointList();
    this.#pointNewPresenter.destroy();

    remove(this.#sortComponent);
    remove(this.#listEmptyComponent);
    remove(this.#infoComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #renderTrip = () => {
    const points = this.points;

    if (!points.length) {
      this.#renderEmptyList();
      return;
    }

    render(this.#infoComponent, tripMainBlock, RenderPosition.AFTERBEGIN);
    render(this.#eventListComponent, this.#eventListContainer);
    this.#renderSort();
    this.#renderPoints();
  };

  #renderPoints = () => {
    this.points.forEach((point) => this.#renderPoint(point, this.#offers, this.#destinations));
  };

  #renderPoint = (point, offers, destinations) => {
    const pointPresenter = new PointPresenter(this.#eventListComponent.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point, offers, destinations);
    this.#pointPresenterMap.set(point.id, pointPresenter);
  };

  #renderEmptyList = () => {
    this.#listEmptyComponent = new ListEmptyView(this.#filterModel.filter);
    render(this.#listEmptyComponent, this.#eventListContainer);
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(SortValue, this.#currentSortType);
    render(this.#sortComponent, this.#eventListContainer, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };
}
