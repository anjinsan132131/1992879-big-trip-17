import { render, replace, remove } from '../framework/render.js';
import { EventEditView, EventItemView } from '../view';
import { EventMode, UserAction, UpdateType } from '../constans.js';


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
    this.#eventEditComponent = new EventEditView(offers, destinations, point);

    this.#pointComponent.setClickHandler(this.#replacePointToEventEdit);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#eventEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#eventEditComponent.setEditClickHandler(this.#handleClick);
    this.#eventEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#eventListContainer);
      return;
    }

    if (this.#mode === EventMode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === EventMode.EDITING) {
      replace(this.#pointComponent, prevPointEditComponent);
      this.#mode = EventMode.DEFAULT;
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#eventEditComponent);
    this.#pointComponent = null;
    this.#eventEditComponent = null;

    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  resetView = () => {
    if (this.#mode !== EventMode.DEFAULT) {
      this.#eventEditComponent.reset(this.#point);
      this.#replaceEventEditToPoint();
    }
  };

  setSaving = () => {
    if (this.#mode === EventMode.EDITING) {
      this.#eventEditComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setDeleting = () => {
    if (this.#mode === EventMode.EDITING) {
      this.#eventEditComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  };

  setAborting = () => {
    if (this.#mode === EventMode.DEFAULT) {
      this.#pointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#eventEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#eventEditComponent.shake(resetFormState);
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
    this.#changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite},
    );
  };

  #handleFormSubmit = (updatedPoint) => {
    this.#changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      updatedPoint,
    );
  };

  #handleClick = () => {
    this.#eventEditComponent.reset(this.#point);
    this.#replaceEventEditToPoint();
  };

  #handleDeleteClick = (point) => {
    this.#changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };
}
