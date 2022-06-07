import dayjs from 'dayjs';
import { FilterValue } from '../constans.js';

const isDateSameToCurrentDate = (date) => dayjs(date).isSame(dayjs(), 'minute');

const isDateInFuture = (date) => dayjs(date).isAfter(dayjs(), 'minute');

const isDateInPast = (date) => dayjs(date).isBefore(dayjs(), 'minute');

export const filter = {
  [FilterValue.Everything]: (points) => points,
  [FilterValue.Future]: (points) => points.filter((point) => isDateSameToCurrentDate(point.dateFrom) || isDateInFuture(point.dateFrom)
    || isDateInPast(point.dateFrom) && isDateInFuture(point.dateTo)),
  [FilterValue.Past]: (points) => points.filter((point) => isDateInPast(point.dateTo)
    || isDateInPast(point.dateFrom) && isDateInFuture(point.dateTo)),
};
