export const toggleTemperatureUnit = (isFahrenheit, setIsFahrenheit) => {
  setIsFahrenheit(!isFahrenheit);
};

export const convertTemperature = (temperature, toFahrenheit) => {
  if (!temperature) {
    return "-";
  }

  if (toFahrenheit) {
    return Math.round((temperature * 9) / 5 + 32);
  } else {
    return Math.round(temperature * 100) / 100;
  }
};
