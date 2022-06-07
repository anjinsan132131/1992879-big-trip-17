import { render, remove, RenderPosition } from '../framework/render.js';
import { EventEditView } from '../view';
import { UserAction, UpdateType } from '../constans.js';
import {nanoid} from 'nanoid';


export default class PointNewPresenter {
  #destinations = null;
  #offers = null;
  #eventEditComponent = null;
  #eventListContainer = null;
  #changeData = null;
  #destroyCallback = null;


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

    this.#eventEditComponent = new EventEditView(this.#offers, this.#destinations);

    this.#eventEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#eventEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#eventEditComponent, this.#eventListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  destroy = () => {
    if (!this.#eventEditComponent) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#eventEditComponent);
    this.#eventEditComponent = null;

    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MAJOR,
      {id: nanoid(), ...point},
    );
    this.destroy();
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
