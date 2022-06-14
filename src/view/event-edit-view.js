import dayjs from 'dayjs';
import he from 'he';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { POINT_TYPE, CITY_NAME, EventSelector } from '../constans.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const NEW_EVENT = {
  basePrice: '',
  dateFrom: new Date(),
  dateTo: new Date(),
  destination: {
    description: '',
    name: '',
    pictures: []
  },
  id: null,
  isFavorite: false,
  offers: [],
  type: POINT_TYPE[0],
};

const createOfferPhotos = (photos) => photos.map(({src, description}) => (
  `<img class="event__photo" src="${src}" alt="${description}">`
)).join('');

const createEventTypes = () => POINT_TYPE.map((type) => (
  `<div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
  </div>`
)).join('');

const createEventCity = () => CITY_NAME.map((city) => (
  `<option value="${city}"></option>`
)).join('');

const createOffers = (allOffersForType, currentOffersList, isDisabled) => allOffersForType.offers.map(({id, title, price}) => {
  const checked = currentOffersList.includes(id) ? 'checked' : '';

  return (
    ` <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title}-${id}" type="checkbox" name="event-offer-${title}" ${checked}  ${isDisabled ? 'disabled' : ''}>
    <label class="event__offer-label" for="event-offer-${title}-${id}">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>`
  );
}).join('');

const createEventEditTemplate = (state, allOffers) => {
  const {
    destinationName,
    destinationDescription,
    destinationPhotos,
    basePrice,
    dateFrom,
    dateTo,
    type,
    offers,
    isDisabled,
    isSaving,
    isDeleting,
  } = state;

  const startDate = dayjs(dateFrom).format('D/MM/YY HH:mm');
  const endDate = dayjs(dateTo).format('D/MM/YY HH:mm');
  const isSubmitDisabled = !basePrice || !startDate || !endDate || !type || !destinationName;

  const photoList = createOfferPhotos(destinationPhotos);
  const eventTypeList = createEventTypes();
  const eventCityList = createEventCity();

  const allOffersForType = allOffers.find((offer) => offer.type === type);
  const offersList = createOffers(allOffersForType, offers);

  return (
    `<li class="trip-events__item">
        <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1" ${isDisabled ? 'disabled' : ''}>
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${eventTypeList}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1" ${isDisabled ? 'disabled' : ''}>
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(destinationName)}" list="destination-list-1" ${isDisabled ? 'disabled' : ''}>
          <datalist id="destination-list-1">
            ${eventCityList}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time event__input--time-start" id="event-start-time-1" type="text" name="event-start-time" value="${startDate}" ${isDisabled ? 'disabled' : ''}>
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time event__input--time-end" id="event-end-time-1" type="text" name="event-end-time" value="${endDate}" ${isDisabled ? 'disabled' : ''}>
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1" ${isDisabled ? 'disabled' : ''}>
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number"  min="0" step="1" name="event-price" value="${basePrice}" ${isDisabled ? 'disabled' : ''}>
        </div>
        <button class="event__save-btn  btn  btn--blue" type="submit"  ${isSubmitDisabled || isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
        <button class="event__reset-btn" type="reset"${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>
        <button class="event__rollup-btn" type="button" ${isDisabled ? 'disabled' : ''}>
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      ${offersList.length > 0 ?
      `<section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
        ${offersList}
        </div>
      </section>` : ''}


      ${destinationDescription.length > 0 ?
      `<section class="event__details">
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destinationDescription}</p>
          ${photoList.length > 0 ?
      ` <div class="event__photos-container">
            <div class="event__photos-tape">
              ${photoList}
            </div>
          </div>` : ''}
        </section>
      </section>` : ''}
    </form>
    </li>`
  );
};

export default class EventEditView extends AbstractStatefulView {
  #allOffers = null;
  #destinations = null;
  #startDatePicker = null;
  #endDatePicker = null;

  constructor(offers, destinations, event = NEW_EVENT) {
    super();
    this._state = EventEditView.parseEventToState(event);
    this.#allOffers = offers;
    this.#destinations = destinations;
    this.#setInnerHandlers();
    this.#setDateFromDatepicker();
    this.#setDateToDatepicker();
  }

  get template() {
    return createEventEditTemplate(this._state, this.#allOffers);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#startDatePicker) {
      this.#startDatePicker.destroy();
      this.#startDatePicker = null;
    }

    if (this.#endDatePicker) {
      this.#endDatePicker.destroy();
      this.#endDatePicker = null;
    }
  };

  reset = (event) => {
    this.updateElement(
      EventEditView.parseEventToState(event)
    );
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #setDateFromDatepicker = () => {
    this.#startDatePicker = flatpickr(
      this.element.querySelector('.event__input--time-start'),
      {
        enableTime: true,
        'time_24hr': true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler
      }
    );
  };

  #setDateToDatepicker = () => {
    this.#endDatePicker = flatpickr(
      this.element.querySelector('.event__input--time-end'),
      {
        enableTime: true,
        'time_24hr': true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onChange: this.#dateToChangeHandler
      }
    );
  };

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector(`.${EventSelector.ROLLUP}`).addEventListener('click', this._callback.editClick);
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector(`.${EventSelector.EDIT}`).addEventListener('submit', this.#formSubmitHandler);
  };

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(EventEditView.parseStateToEvent(this._state));
  };


  #formSubmitHandler = (event) => {
    event.preventDefault();
    this._callback.formSubmit(EventEditView.parseStateToEvent(this._state));
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDateFromDatepicker();
    this.#setDateToDatepicker();
    this.setEditClickHandler(this._callback.editClick);
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-list').addEventListener('change', this.#changeTypeClickHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#changeCityClickHandler);
    this.element.querySelector('#event-price-1').addEventListener('change', this.#priceChangeClickHandler);
    if(this.element.querySelector('.event__available-offers')) {
      this.element.querySelector('.event__available-offers').addEventListener('change', this.#offersClickHandler);
    }
  };

  #changeTypeClickHandler = (event) => {
    event.preventDefault();

    const type = event.target.value;

    this.updateElement({
      type,
      offers: [],
    });
  };

  #changeCityClickHandler = (event) => {
    event.preventDefault();
    const cityValue = event.target.value;
    const destination = this.#destinations.find((element) => element.name === cityValue);
    this.updateElement({
      destinationName: destination ? destination.name : '',
      destinationDescription: destination ? destination.description : '',
      destinationPhotos: destination ? [...destination.pictures] : [],
    });
  };

  #priceChangeClickHandler = (event) => {
    let newPrice = Math.round(event.target.value);

    if (isNaN(newPrice)) {
      newPrice = '';
    }

    this.updateElement({
      basePrice: newPrice,
    });
  };

  #offersClickHandler = (event) => {
    const isChecked = event.target.checked;
    const currentOfferData = event.target.id.split('-');
    const newOfferId = +currentOfferData[currentOfferData.length -1];

    const oldOfferIds = [...this._state.offers];

    let newOfferIds;

    if (isChecked) {
      newOfferIds = [...oldOfferIds, newOfferId];
    } else {
      newOfferIds = oldOfferIds.filter((offerId) => offerId !== newOfferId);
    }

    this.updateElement({
      offers: newOfferIds,
    });
  };

  static parseEventToState = (event) => ({
    ...event,
    destinationName : event.destination.name ? event.destination.name : '',
    destinationDescription : event.destination.description ? event.destination.description : '',
    destinationPhotos : event.destination.pictures ? [...event.destination.pictures] : [],
    isDisabled: false,
    isSaving: false,
    isDeleting: false,

  });

  static parseStateToEvent = (state) => {
    const event = {...state};

    event.destination.name = event.destinationName;
    event.destination.description = event.destinationDescription;
    event.destination.pictures = [...event.destinationPhotos];

    delete event.destinationName;
    delete event.destinationDescription;
    delete event.destinationPhotos;
    delete event.isDisabled;
    delete event.isSaving;
    delete event.isDeleting;

    return event;
  };
}
