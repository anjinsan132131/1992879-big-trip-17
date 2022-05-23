import dayjs from 'dayjs';

export const comparePrice = (firstPoint, secondPoint) => (secondPoint.basePrice - firstPoint.basePrice) === 0 ?
  dayjs(firstPoint.dateFrom).diff(dayjs(secondPoint.dateFrom)):
  (secondPoint.basePrice - firstPoint.basePrice);

export const compareDuration = (firstPoint, secondPoint) => {
  const durationFirstPoint = dayjs(firstPoint.dateTo).diff(dayjs(firstPoint.dateFrom));
  const durationSecondPoint = dayjs(secondPoint.dateTo).diff(dayjs(secondPoint.dateFrom));

  return (durationSecondPoint - durationFirstPoint === 0) ?
    dayjs(firstPoint.dateFrom).diff(dayjs(secondPoint.dateFrom)) :
    durationSecondPoint - durationFirstPoint;
};
