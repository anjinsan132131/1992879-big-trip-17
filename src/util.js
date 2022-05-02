export const getRandomInteger = (min, max) => {
  const lowerValue = Math.min(min,max);
  const upperValue = Math.max(min,max);
  const result = Math.random() * (upperValue - lowerValue + 1) + lowerValue;
  return Math.floor(result);
};

export const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export const getDurationTime = (timeInMs) => {
  const days = Math.floor(timeInMs / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
  const hours = (Math.floor(timeInMs / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
  const minutes = (Math.floor(timeInMs / (1000 * 60)) % 60).toString().padStart(2, '0');
  const modifiedDays = days > 0 ? `${days}D ` : '';
  let modifiedHours = `${hours}H `;

  if (days === 0) {
    modifiedHours = hours > 0 ? `${hours}H ` : '';
  }

  return `${modifiedDays}${modifiedHours}${minutes}M`;
};
