const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = 360;
const HOURS_IN_DAY = 24;

export const getRandomInteger = (min, max) => {
  const lowerValue = Math.min(min,max);
  const upperValue = Math.max(min,max);
  const result = Math.random() * (upperValue - lowerValue + 1) + lowerValue;
  return Math.floor(result);
};

export const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export const getDurationTime = (timeInMs) => {
  const days = Math.floor(timeInMs / (MILLISECONDS_IN_SECOND * SECONDS_IN_HOUR * HOURS_IN_DAY)).toString().padStart(2, '0');
  const hours = (Math.floor(timeInMs / (MILLISECONDS_IN_SECOND * SECONDS_IN_HOUR)) % HOURS_IN_DAY).toString().padStart(2, '0');
  const minutes = (Math.floor(timeInMs / (MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE)) % SECONDS_IN_MINUTE).toString().padStart(2, '0');
  const modifiedDays = days > 0 ? `${days}D ` : '';
  let modifiedHours = `${hours}H `;

  if (days === 0) {
    modifiedHours = hours > 0 ? `${hours}H ` : '';
  }

  return `${modifiedDays}${modifiedHours}${minutes}M`;
};

export const isEventRepeating = (type) => Object.values(type).some(Boolean);

export const getOffersByCurrentType = ({type, offers}) => {

  for (const offerItem of offers) {
    if (offerItem.type === type) {
      return {...offerItem};
    }
  }
};

export const getUpperCaseFirstLetter = (type) => type[0].toUpperCase() + type.slice(1, type.length);
