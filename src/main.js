import InfoView from './view/info-view';
import { render, RenderPosition } from './render.js';
import { EventListPresenter } from './presenter/index.js';
import { FilterView, SortView} from './view/index.js';

const tripMainBlock = document.querySelector('.trip-main');
const tripControlsFilter = document.querySelector('.trip-controls__filters');
const tripEventsBlock = document.querySelector('.trip-events');
const eventListPresenter = new EventListPresenter();


render(new InfoView(), tripMainBlock, RenderPosition.AFTERBEGIN);
render(new FilterView(), tripControlsFilter);
render(new SortView(), tripEventsBlock);

eventListPresenter.init(tripEventsBlock);
