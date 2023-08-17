export type WidgetRefT = {
  isShowSettings: boolean;
  isLodaingData: boolean;
};
export type WeatherCardT = {
  position: string;
  cloudiness: number;
  visibility: number;
  weatherIcons: weatherIcon[];
  main: WeatherMainDataT;
  wind: Wind;
  longitude: number;
  latitude: number;
};
export type WeatherRefT = WeatherCardT[];
interface Wind {
  speed: number;
  deg: number;
}

export type WeatherMainDataT = {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
};

interface weatherIcon {
  description: string;
  icon: string;
  id: number;
  main: string;
}
