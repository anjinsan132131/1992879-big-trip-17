import { render } from './framework/render.js';
import { EventListPresenter } from './presenter';
import { FilterView } from './view';
import PointsModel from './model/point-model.js';
import { FilterValue } from './constans.js';

const tripControlsFilter = document.querySelector('.trip-controls__filters');
const tripEventsBlock = document.querySelector('.trip-events');

const filterList = Object.values(FilterValue);

const pointsModel = new PointsModel();
const eventListPresenter = new EventListPresenter();

render(new FilterView(filterList), tripControlsFilter);

eventListPresenter.init(tripEventsBlock, pointsModel);

