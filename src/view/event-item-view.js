import dayjs from 'dayjs';
import AbstractView from '../framework/view/abstract-view.js';
import { getDurationTime } from '../util.js';
import { OFFERS_LIST } from '../mock/offers.js';
import { EventSelector } from '../constans.js';

const createOffers = (offers) => offers.map(({title, price}) => (
  `<li class="event__offer">
      <span class="event__offer-title">${title}</span> &plus;&euro;&nbsp;<span class="event__offer-price">${price}</span>
    </li>`
)).join('');

const createEventItemTemplate = (event) => {


  const { basePrice, type, isFavorite, destination, offers, dateFrom, dateTo } = event;
  const { name } = destination;

  const favoriteClassName = isFavorite
    ? 'event__favorite-btn--active'
    : '';

  const offersList = OFFERS_LIST.find((offer) => offer.type === type).offers.filter(({id}) => offers.includes(id));
  const servicesList = createOffers(offersList);

  const startDate = dayjs(dateFrom).format('MMM D');
  const timeStart = dayjs(dateFrom).format('H:mm');
  const timeEnd = dayjs(dateTo).format('H:mm');

  const timeDuration = getDurationTime(dayjs(dateTo).diff(dayjs(dateFrom)));

  return (`<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="2019-03-18">${startDate}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dateFrom}">${timeStart}</time>
          &mdash;
          <time class="event__end-time" datetime="${dateTo}">${timeEnd}</time>
        </p>
        <p class="event__duration">${timeDuration}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${servicesList}
      </ul>
      <button class="event__favorite-btn ${favoriteClassName}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
  );
};

export default class EventItemView extends AbstractView {
  #event = null;

  constructor(event) {
    super();
    this.#event = event;
  }

  get template() {
    return createEventItemTemplate(this.#event);
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector(`.${EventSelector.ROLLUP}`).addEventListener('click', this.#clickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  #favoriteClickHandler = (event) => {
    event.preventDefault();
    this._callback.favoriteClick();
  };
}
