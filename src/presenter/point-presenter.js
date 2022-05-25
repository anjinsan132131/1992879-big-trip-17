import { render, replace, remove } from '../framework/render.js';
import { EventEditView, EventItemView } from '../view';
import { EventMode } from '../constans.js';


export default class PointPresenter {
  #point = null;
  #pointComponent = null;
  #eventEditComponent = null;
  #eventListContainer = null;
  #changeData = null;
  #changeMode = null;
  #mode = EventMode.DEFAULT;

  constructor(eventListContainer, changeData, changeMode) {
    this.#eventListContainer = eventListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (point, offers, destinations) => {
    this.#point = point;
    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#eventEditComponent;

    this.#pointComponent = new EventItemView(point, offers);
    this.#eventEditComponent = new EventEditView(point, offers, destinations);

    this.#pointComponent.setClickHandler(this.#replacePointToEventEdit);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#eventEditComponent.setFormSubmitHandler(this.#replaceEventEditToPoint);
    this.#eventEditComponent.setEditClickHandler(this.#handleClick);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#eventListContainer);
      return;
    }

    if (this.#mode === EventMode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === EventMode.EDITING) {
      replace(this.#eventEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#eventEditComponent);
  };

  resetView = () => {
    if (this.#mode !== EventMode.DEFAULT) {
      this.#eventEditComponent.reset(this.#point);
      this.#replaceEventEditToPoint();
    }
  };

  #replacePointToEventEdit = () => {
    replace(this.#eventEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#changeMode();
    this.#mode = EventMode.EDITING;
  };

  #replaceEventEditToPoint = () => {
    replace(this.#pointComponent, this.#eventEditComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = EventMode.DEFAULT;
  };

  #onEscKeyDown = (event) => {
    if (event.key === 'Escape' || event.key === 'Esc') {
      event.preventDefault();
      this.#eventEditComponent.reset(this.#point);
      this.#replaceEventEditToPoint();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #handleClick = () => {
    this.#eventEditComponent.reset(this.#point);
    this.#replaceEventEditToPoint();
  };
}
