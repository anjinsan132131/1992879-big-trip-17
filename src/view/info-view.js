import dayjs from 'dayjs';
import AbstractView from '../framework/view/abstract-view.js';
import { SpecialSymbols } from '../constans.js';

const getTripTitle = (points) => {
  switch (points.length) {
    case 1:
      return [points[0].destination.name];
    case 2:
      return [`${points[0].destination.name} ${SpecialSymbols.DASH} ${points[1].destination.name}`];
    case 3:
      return [`${points[0].destination.name} ${SpecialSymbols.DASH} ${points[1].destination.name} ${SpecialSymbols.DASH} ${points[2].destination.name}`];
    default:
      return [`${points[0].destination.name} ${SpecialSymbols.DASH} ... ${SpecialSymbols.DASH} ${points[points.length - 1].destination.name}`];
  }
};

const getTripDates = (points) => `${dayjs(points[0].dateFrom).format('DD MMM')}${SpecialSymbols.SPACE}${SpecialSymbols.DASH}${SpecialSymbols.SPACE}${dayjs(points[points.length - 1].dateTo).format('DD MMM')}`;

const getOffersCost = (points, offersData) => {
  const pointsOffersPrice = [];

  for(const point of points) {
    const offerIndex = offersData.findIndex((item) => item.type === point.type);
    const pointOffers = offersData[offerIndex].offers;
    const targetOffers = pointOffers.filter((item) => point.offers.some((el) => item.id === el));
    targetOffers.forEach((item) => pointsOffersPrice.push(item.price));
  }

  const offersCost = pointsOffersPrice.reduce((acc, price) => acc + price, 0);
  return offersCost;
};

const getTripCost = (points, offers) => {
  const basePriceCosts = points.reduce((sum, point) => sum + Number(point.basePrice), 0);
  const offersCost = getOffersCost(points, offers);

  return basePriceCosts + offersCost;
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
