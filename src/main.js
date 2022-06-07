import { TripPresenter, FilterPresenter } from './presenter';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import { NewPointButtonView } from './view';
import {render} from './framework/render.js';

const tripControlsFilter = document.querySelector('.trip-controls__filters');
const tripEventsBlock = document.querySelector('.trip-events');
const siteMainElement = document.querySelector('.trip-main');

const filterModel = new FilterModel();
const pointsModel = new PointsModel();
const tripPresenter = new TripPresenter(tripEventsBlock, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(tripControlsFilter, filterModel, pointsModel);
const newPointButtonComponent = new NewPointButtonView();

const handleNewPointFormClose = () => {
  newPointButtonComponent.element.disabled = false;
};

const handleNewPointButtonClick = () => {
  newPointButtonComponent.element.disabled = true;
  tripPresenter.createPoint(handleNewPointFormClose);
};

newPointButtonComponent.setClickHandler(handleNewPointButtonClick);
render(newPointButtonComponent, siteMainElement);

filterPresenter.init();
tripPresenter.init();
