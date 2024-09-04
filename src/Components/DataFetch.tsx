import axios from "axios";

export interface WeatherDataProps {
  name: string;

  main: {
    temp: number;
    humidity: number;
  };
  sys: {
    country: string;
  };
  weather: {
    main: string;
  }[];
  wind: {
    speed: number;
  };
}
export const fetchCurrentWeather = async (
  searchTerm: string,
  lat?: number,
  lon?: number,
  cityName?: string
): Promise<WeatherDataProps> => {
  try {
    const api_key = process.env.REACT_APP_API_KEY;
    const api_Endpoint = process.env.REACT_APP_API_ENDPOINT_DATA;
    let url = "";
    if (searchTerm === "byCity" && cityName) {
      url = `${api_Endpoint}weather?q=${cityName}&appid=${api_key}&units=metric`;
    } else if (
      searchTerm === "byCoords" &&
      lat !== undefined &&
      lon !== undefined
    ) {
      url = `${api_Endpoint}weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
    }
    const response = await axios.get<WeatherDataProps>(url); // Specify the response type here
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
