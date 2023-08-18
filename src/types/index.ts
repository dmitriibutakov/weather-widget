export type WeatherData = {
  position: {
    city: string;
    country: string;
  };
  cloudiness: number;
  visibility: number;
  weatherIcons: WeatherIcon[];
  main: WeatherCondition;
  wind: Wind;
  longitude: number;
  latitude: number;
};

interface Wind {
  speed: number;
  deg: number;
}

export type WeatherCondition = {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
};

interface WeatherIcon {
  description: string;
  icon: string;
  id: number;
  main: string;
}
