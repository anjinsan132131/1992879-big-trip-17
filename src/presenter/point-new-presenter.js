import { render, remove, RenderPosition } from '../framework/render.js';
import { EventEditView, ServerErrorMessageView } from '../view';
import { UserAction, UpdateType } from '../constans.js';

export default class PointNewPresenter {
  #destinations = null;
  #offers = null;
  #eventEditComponent = null;
  #eventListContainer = null;
  #changeData = null;
  #destroyCallback = null;
  #errorMessageBlock = null;


  constructor(eventListContainer, changeData, destinations, offers) {
    this.#destinations = destinations;
    this.#offers = offers;
    this.#eventListContainer = eventListContainer;
    this.#changeData = changeData;
  }

  init = (callback) => {
    this.#destroyCallback = callback;

    if (this.#eventEditComponent) {
      return;
    }

    if (!this.#offers.length && !this.#destinations.length) {
      this.#errorMessageBlock = new ServerErrorMessageView();
      render(this.#errorMessageBlock, this.#eventListContainer, RenderPosition.AFTERBEGIN);
    } else {
      this.#eventEditComponent = new EventEditView(this.#offers, this.#destinations);

      this.#eventEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
      this.#eventEditComponent.setDeleteClickHandler(this.#handleDeleteClick);
      this.#eventEditComponent.setEditClickHandler(this.#handleDeleteClick);

      render(this.#eventEditComponent, this.#eventListContainer, RenderPosition.AFTERBEGIN);

      document.addEventListener('keydown', this.#onEscKeyDown);
    }
  };

  destroy = () => {
    if (!this.#eventEditComponent) {
      return;
    }

    remove(this.#eventEditComponent);
    this.#eventEditComponent = null;

    this.#destroyCallback?.();

    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  setSaving = () => {
    this.#eventEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  setAborting = () => {
    const resetFormState = () => {
      this.#eventEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#eventEditComponent.shake(resetFormState);
  };

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MAJOR,
      point,
    );
  };

  #onEscKeyDown = (event) => {
    if (event.key === 'Escape' || event.key === 'Esc') {
      event.preventDefault();
      this.destroy();
    }
  };

  #handleDeleteClick = () => {
    this.destroy();
  };
}
