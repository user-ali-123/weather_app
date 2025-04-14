const apiKey = 'cf8fb63866924351963102415251104';

export const fetchWeatherData = async (city) => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5`
  );
  const data = await response.json();

  if (data.error) throw new Error(data.error.message);

  const weather = {
    location: `${data.location.name}, ${data.location.country}`,
    temperature: data.current.temp_c,
    condition: data.current.condition.text,
    icon: data.current.condition.icon,
    wind: (data.current.wind_kph / 3.6).toFixed(2),
    humidity: data.current.humidity
  };

  const forecast = data.forecast.forecastday.map((day) => ({
    day: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
    icon: (
      <img
        src={day.day.condition.icon.startsWith('//') ? 'https:' + day.day.condition.icon : day.day.condition.icon}
        alt="icon"
        width={30}
      />
    ),
    low: Math.round(day.day.mintemp_c),
    high: Math.round(day.day.maxtemp_c)
  }));

  return { weather, forecast };
};

export const fetchCitySuggestions = async (query) => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${query}`
  );
  const data = await response.json();
  return data;
};
