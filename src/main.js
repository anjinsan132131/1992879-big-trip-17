import { TripPresenter, FilterPresenter } from './presenter';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import { NewPointButtonView } from './view';
import {render} from './framework/render.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic a81qwer2906nji1';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip';

const tripControlsFilter = document.querySelector('.trip-controls__filters');
const tripEventsBlock = document.querySelector('.trip-events');
const siteMainElement = document.querySelector('.trip-main');

const filterModel = new FilterModel();
const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION));
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

filterPresenter.init();
tripPresenter.init();
pointsModel.init()
  .finally(() =>{
    newPointButtonComponent.setClickHandler(handleNewPointButtonClick);
    render(newPointButtonComponent, siteMainElement);
  });
