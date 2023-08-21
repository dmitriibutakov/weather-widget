import { useWeatherStore } from "@/store/weather";
import { ninjaApi, weatherApi } from "@/api";
import { createPinia } from "pinia";
import { ApiNinjaCityData } from "@/api/types/ninjaApi";
import { ApiWeatherData } from "@/api/types/weatherApi";
import { WeatherData } from "@/types";

const pinia = createPinia();
describe("WeatherStore Actions", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // clear mocks
  });

  it("fetchWeatherData updates weatherCollection correctly", async () => {
    const cityInitial = {
      base: "stations",
      clouds: { all: 0 },
      cod: 200,
      coord: { lon: 4.7667, lat: 36.0667 },
      dt: 1692639713,
      latitude: 123.456,
      longitude: 456.789,
      id: 2503701,
      main: {
        feels_like: 27.25,
        grnd_level: 918,
        humidity: 25,
        pressure: 1017,
        sea_level: 1017,
        temp: 28.5,
        temp_max: 28.5,
        temp_min: 28.5,
      },
      name: "Bordj Bou Arreridj",
      sys: {
        type: 11,
        id: 0,
        country: "DZ",
        sunrise: 1692594228,
        sunset: 1692642296,
      },
      timezone: 3600,
      visibility: 10000,
      weather: [
        { id: 800, main: "Clear", description: "clear sky", icon: "01d" },
      ],
      wind: {
        speed: 6.04,
        deg: 26,
        gust: 7.19,
      },
    } as ApiWeatherData;
    const store = useWeatherStore(pinia);
    const mockWeatherData = { ...cityInitial };
    jest.spyOn(weatherApi, "getWeather").mockResolvedValue(mockWeatherData);
    await store.fetchWeatherData();
    expect(store.getWeather).toEqual(mockWeatherData);
  });

  it("addCity adds a new city to weatherCollection", async () => {
    const store = useWeatherStore(pinia);
    const cityName = "Batumi";
    const mockCityData: ApiNinjaCityData = [
      {
        name: "Batumi",
        latitude: 0,
        longitude: 0,
        population: 0,
        country: "",
        is_capital: false,
      },
    ];

    jest.spyOn(ninjaApi, "getCity").mockResolvedValue(mockCityData);

    await store.addCity(cityName);

    expect(store.getWeather.length).toBe(1);
    expect(store.getWeather[0].position.city).toBe(mockCityData[0].name);
  });

  it("deleteCity removes a city from weatherCollection", async () => {
    const cityInitial: WeatherData = {
      position: {
        city: "Batumi",
        country: "GE",
      },
      cloudiness: 0,
      visibility: 10,
      weatherIcons: [
        {
          description: "",
          icon: "",
          id: 0,
          main: "02",
        },
      ],
      main: {
        feels_like: 0,
        humidity: 0,
        pressure: 0,
        temp: 0,
      },
      wind: {
        speed: 0,
        deg: 0,
      },
      longitude: 40,
      latitude: 35,
    };
    const store = useWeatherStore(pinia);
    const initialWeatherCollection = [cityInitial];
    store.weatherCollection = initialWeatherCollection;
    const cityToDeleteIndex = 0;
    await store.deleteCity(cityToDeleteIndex);
    expect(store.weatherCollection.length).toBe(
      initialWeatherCollection.length - 1
    );
  });
});
