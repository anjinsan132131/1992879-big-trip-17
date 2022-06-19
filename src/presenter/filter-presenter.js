import { render, replace, remove } from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import { UpdateType, FilterValue } from '../constans.js';
import { filter } from '../utils/filter.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #pointsModel = null;
  #filterComponent = null;

  constructor(filterContainer, filterModel, pointsModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filtersCount() {
    const points = this.#pointsModel.points;

    return {
      [FilterValue.Everything]: filter[FilterValue.Everything](points).length,
      [FilterValue.Past]: filter[FilterValue.Past](points).length,
      [FilterValue.Future]: filter[FilterValue.Future](points).length
    };
  }

  init = () => {
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(this.#filterModel.filterType, this.filtersCount);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filterType === filterType) {
      return;
    }

    this.#filterModel.setFilterType(UpdateType.MAJOR, filterType);
  };
}
