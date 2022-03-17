import React from "react";

const apiKey = "";
export const useWeatherApp = (location) => {
  const [weather, setWeather] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=1&aqi=no&alerts=no`)
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [location]);

  return [weather, error, isLoading];
}