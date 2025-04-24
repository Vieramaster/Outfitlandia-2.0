type WeatherAPIResponse = {
  main: object;
  wind: object;
  weather: unknown[];
};

// validamos me de un objeto con key
const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

// bueno, este no salio XD
const isValidKeys = <const Keys extends ReadonlyArray<string>>(
  keys: Keys,
  object: Readonly<Record<PropertyKey, unknown>>
): object is Record<Keys[number], unknown> =>
  keys.every((key) => key in object);

const requiredWeatherKeys = ["main", "wind", "weather"] as const;
const requiredWindKeys = ["windspeed"] as const;
const requiredMainKeys = ["temp"] as const;

const isValidAPIResponse = <T>(data: unknown, arrayKeys: string[]): data is T =>
  isObject(data) && isValidKeys(arrayKeys, data);

const mainApi = () => {};

const lala = (api: unknown) => {
  if (!<WeatherAPIResponse>isValidAPIResponse(api, requiredWeatherKeys)) return false;

  const { main, wind } = api;

  return true;
};
