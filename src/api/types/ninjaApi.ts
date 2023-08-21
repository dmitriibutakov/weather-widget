export type NinjaApiModule = {
  getCity: (val: string) => Promise<ApiNinjaCityData>;
};
export type ApiNinjaCityData = City[];

interface City {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  population: number;
  is_capital: boolean;
}
