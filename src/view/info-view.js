import dayjs from 'dayjs';
import AbstractView from '../framework/view/abstract-view.js';
import { SpecialSymbols } from '../constans.js';

const getTripTitle = (points) => {
  const [firstPoint, secondPoint, thirdPoint] = points;

  switch (points.length) {
    case 1:
      return [firstPoint.destination.name];
    case 2:
      return [`${firstPoint.destination.name} ${SpecialSymbols.DASH} ${secondPoint.destination.name}`];
    case 3:
      return [`${firstPoint.destination.name} ${SpecialSymbols.DASH} ${secondPoint.destination.name} ${SpecialSymbols.DASH} ${thirdPoint.destination.name}`];
    default:
      return [`${firstPoint.destination.name} ${SpecialSymbols.DASH} ... ${SpecialSymbols.DASH} ${points[points.length - 1].destination.name}`];
  }
};

const getTripDates = (points) => {
  const dateFrom = dayjs(points[0].dateFrom).format('DD MMM');
  const dateTo = dayjs(points[points.length - 1].dateTo).format('DD MMM');
  const specialSybmols = `${SpecialSymbols.SPACE}${SpecialSymbols.DASH}${SpecialSymbols.SPACE}`;

  return `${dateFrom}${specialSybmols}${dateTo}`;
};

const getTripCost = (points, offers) => {
  let totalCost = 0;

  points.forEach((point) => {
    const offerIndex = offers.findIndex((item) => item.type === point.type);
    const pointOffers = offers[offerIndex].offers;
    const targetOffers = pointOffers.filter((item) => point.offers.some((offer) => item.id === offer));

    totalCost += point.basePrice + targetOffers.reduce((total, offer) => total + offer.price, 0);
  });

  return totalCost;
};

const createInfoTemplate = (points, offers) => (
  `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${getTripTitle(points)}</h1>
      <p class="trip-info__dates">${getTripDates(points)}</p>
    </div>
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTripCost(points, offers)}</span>
    </p>
  </section>`
);

export default class InfoView extends AbstractView {
  #points = null;
  #offers = null;

  constructor(points, offers) {
    super();
    this.#points = points;
    this.#offers = offers;
  }

  get template() {
    return createInfoTemplate(this.#points, this.#offers);
  }
}
