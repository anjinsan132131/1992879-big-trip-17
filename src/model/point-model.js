import { generatePoint } from '../mock/point.js';

const POINTS_TOTAL_COUNT = 3;

export default class PointsModel {
  points = Array.from({length: POINTS_TOTAL_COUNT}, generatePoint);

  getPoints = () => this.points;
}
