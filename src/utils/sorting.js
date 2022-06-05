import dayjs from 'dayjs';

export const sortByPrice = (firstPoint, secondPoint) => (secondPoint.basePrice - firstPoint.basePrice) === 0 ?
  dayjs(firstPoint.dateFrom).diff(dayjs(secondPoint.dateFrom)):
  (secondPoint.basePrice - firstPoint.basePrice);

export const sortByDuration = (firstPoint, secondPoint) => {
  const durationFirstPoint = dayjs(firstPoint.dateTo).diff(dayjs(firstPoint.dateFrom));
  const durationSecondPoint = dayjs(secondPoint.dateTo).diff(dayjs(secondPoint.dateFrom));

  return (durationSecondPoint - durationFirstPoint === 0) ?
    dayjs(firstPoint.dateFrom).diff(dayjs(secondPoint.dateFrom)) :
    durationSecondPoint - durationFirstPoint;
};

export const sortByDay = (firstPoint, secondPoint) => dayjs(firstPoint.dateFrom).diff(dayjs(secondPoint.dateFrom));
