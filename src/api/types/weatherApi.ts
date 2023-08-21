export type WeatherApiModule = {
  getWeather: (latitude: number, longitude: number) => Promise<ApiWeatherData>;
};
export type ApiWeatherData = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: ApiWeatherMain;
  visibility: number;
  wind: ApiWeatherWind;
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

interface ApiWeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface ApiWeatherWind {
  speed: number;
  deg: number;
}
