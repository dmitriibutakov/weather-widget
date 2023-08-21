import { useWeatherStore } from "@/store/weather";
import { ninjaApi, weatherApi } from "@/api";
import { createPinia } from "pinia";
import { ApiNinjaCityData } from "@/api/types/ninjaApi";
import { ApiWeatherData } from "@/api/types/weatherApi";
import { WeatherData } from "@/types";

const cityData = [
  {
    base: "stations",
    clouds: { all: 0 },
    cod: 200,
    coord: { lat: 36.0667, lon: 4.7667 },
    dt: 1692639713,
    id: 2503701,
    name: "Bordj Bou Arreridj",
    latitude: 123.456,
    longitude: 456.789,
    main: {
      feels_like: 27.25,
      humidity: 25,
      pressure: 1017,
      temp: 28.5,
      temp_max: 28.5,
      temp_min: 28.5,
    },
    sys: {
      country: "DZ",
      id: 0,
      sunrise: 1692594228,
      sunset: 1692642296,
      type: 11,
    },
    timezone: 3600,
    visibility: 10000,
    weather: [
      { description: "clear sky", icon: "01d", id: 800, main: "Clear" },
    ],
    wind: { deg: 26, speed: 6.04 },
  },
] as ApiWeatherData[];
const pinia = createPinia();
describe("WeatherStore Actions", () => {
  beforeEach(() => {
    localStorage.removeItem("weather");
    localStorage.setItem("weather", JSON.stringify(cityData));
    jest.clearAllMocks(); // clear mocks
  });

  it("fetchWeatherData updates weatherCollection correctly", async () => {
    const store = useWeatherStore(pinia);
    const mockWeatherData = cityData[0];
    jest.spyOn(weatherApi, "getWeather").mockResolvedValue(mockWeatherData);
    await store.fetchWeatherData();
    expect(store.getWeather[0]).toEqual(mockWeatherData);
  });

  it("addCity adds a new city to weatherCollection", async () => {
    const store = useWeatherStore(pinia);
    const cityName = "Bordj Bou Arreridj";
    const mockCityData: ApiNinjaCityData = [
      {
        name: "Bordj Bou Arreridj",
        latitude: 0,
        longitude: 0,
        population: 0,
        country: "",
        is_capital: false,
      },
    ];

    jest.spyOn(ninjaApi, "getCity").mockResolvedValue(mockCityData);

    await store.addCity(cityName);
    console.log(store.getWeather[0]);
    expect(store.getWeather.length).toBe(1);
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
