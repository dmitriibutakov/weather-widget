export type WidgetRef = {
  isShowSettings: boolean;
};
export type PositionRef = {
  longitude: number;
  latitude: number;
};
export type WeatherRef = {
  position: string;
  cloudiness: number;
  visibility: number;
  weather: Weather[];
  main: MainWeatherRef;
  wind: Wind;
};
interface Wind {
  speed: number;
  deg: number;
}
interface Weather {
  description: string;
  icon: string;
  id: number;
  main: string;
}
export type MainWeatherRef = {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
};
