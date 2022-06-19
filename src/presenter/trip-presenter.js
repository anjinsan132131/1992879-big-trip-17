import { EventListView, ListEmptyView, InfoView, SortView, LoadingView  } from '../view';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import { render, RenderPosition, remove } from '../framework/render.js';
import { SortType, SortValue, UserAction, UpdateType, FilterValue, UiBlockerTimeLimit } from '../constans.js';
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

  #loadingComponent = new LoadingView();
  #eventListComponent = new EventListView();
  #infoComponent = null;
  #listEmptyComponent = null;
  #sortComponent = null;
  #isLoading = true;
  #uiBlocker = new UiBlocker(UiBlockerTimeLimit.LOWER_LIMIT, UiBlockerTimeLimit.UPPER_LIMIT);

  constructor(container, pointsModel, filterModel) {
    this.#eventListContainer = container;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const filterType = this.#filterModel.filterType;
    const points = this.#pointsModel.points;
    this.#offers = this.#pointsModel.offers;
    this.#destinations = this.#pointsModel.destinations;
    this.#pointNewPresenter = new PointNewPresenter(this.#eventListComponent.element, this.#handleViewAction, this.#destinations, this.#offers);
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
    this.#filterModel.setFilterType(UpdateType.MAJOR, FilterValue.Everything);
    remove(this.#listEmptyComponent);
    this.#pointNewPresenter.init(callback);
  };

  #handleModeChange = () => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenterMap.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenterMap.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(error) {
          this.#pointPresenterMap.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#pointNewPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(error) {
          this.#pointNewPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenterMap.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(error) {
          this.#pointPresenterMap.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenterMap.get(data.id).init(data);
        break;
      case UpdateType.MAJOR:
        this.#clearTrip();
        this.#renderTrip();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderTrip();
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

  #renderLoading = () => {
    render(this.#loadingComponent, this.#eventListContainer, RenderPosition.AFTERBEGIN);
  };

  #renderTrip = () => {
    render(this.#eventListComponent, this.#eventListContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const points = this.points;

    if (!points.length) {
      this.#renderEmptyList();
      return;
    }

    this.#renderTripInfo();
    render(this.#infoComponent, tripMainBlock, RenderPosition.AFTERBEGIN);
    this.#renderSort();
    this.#renderPoints();
  };

  #renderTripInfo = () => {
    this.#infoComponent = new InfoView(this.#pointsModel.points, this.#pointsModel.offers);
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
    this.#listEmptyComponent = new ListEmptyView(this.#filterModel.filterType);
    render(this.#listEmptyComponent, this.#eventListContainer);
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(SortValue, this.#currentSortType);
    render(this.#sortComponent, this.#eventListContainer, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };
}
