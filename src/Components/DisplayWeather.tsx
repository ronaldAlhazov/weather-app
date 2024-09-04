import React, { useEffect, useState } from "react";
import WeatherHeader from "./WeatherHeader";
import { useQuery } from "@tanstack/react-query";
import { MainWrapper } from "./MainWrapper";
import SearchBar from "./SerchBar";
import WeatherArea from "./WeatherArea";
import { fetchCurrentWeather, WeatherDataProps } from "./DataFetch";
import RecentSearches from "./RecentSearches";

function DisplayWeather() {
  const [locationStatus, setLocationStatus] = useState("Loading...");
  const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(null);
  const [fechFromSearchBar, setFechFromSearchBar] = useState(false);
  const [fechFromHistory, setFechFromHistory] = useState(false);

  const [history, setHistory] = useState<string[]>(() => {
    const savedHistory = localStorage.getItem("searchHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  useEffect(() => {
    if (fechFromHistory) setFechFromSearchBar(false);
    console.log("History :" + fechFromHistory);
    console.log("fechFromSearchBar :" + fechFromSearchBar);
  }, [fechFromHistory]);

  useEffect(() => {
    if (fechFromSearchBar) setFechFromHistory(false);
    console.log("fechFromSearchBar :" + fechFromSearchBar);
    console.log("History :" + fechFromHistory);
  }, [fechFromSearchBar]);

  useEffect(() => {
    if (weatherData?.name) {
      const normalizedCity = weatherData.name.toLowerCase();

      setHistory((prevHistory) => {
        // Filter out duplicates and keep the list to max 5 items
        const newHistory = [
          weatherData.name,
          ...prevHistory
            .map((item) => item.toLowerCase()) // Normalize existing history items to lowercase
            .filter((item) => item !== normalizedCity) // Remove the latest city if it's already in the history
            .slice(0, 4), // Keep only the latest 4 items
        ];

        // Save the updated history to localStorage
        localStorage.setItem("searchHistory", JSON.stringify(newHistory));

        return newHistory;
      });
    }
  }, [weatherData]);

  const {
    data: weatherDefaultData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["weatherDefaultData", coordinates],
    queryFn: () => {
      if (coordinates) {
        return fetchCurrentWeather(
          "byCoords",
          coordinates.lat,
          coordinates.lon
        );
      }
      return null;
    },
    enabled: !!coordinates, // Only run the query if coordinates are available
  });

  useEffect(() => {
    const fetchCoordinates = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lon: longitude });
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setLocationStatus(
                "To see the forecast according to your location, confirm access to the location and refresh the page!"
              );
              break;
            case error.POSITION_UNAVAILABLE:
              setLocationStatus("Location information unavailable");
              break;
            default:
              setLocationStatus("An error occurred");
          }
        }
      );
    };

    fetchCoordinates();
  }, []);

  // Handle loading, error, and display weather data
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    setLocationStatus(error?.message || "An error occurred");
  }

  return (
    <MainWrapper>
      <WeatherHeader />
      <div className="container">
        <WeatherArea
          weatherData={weatherDefaultData || null} // Show default weather data if available
          message={locationStatus || ""}
        />
      </div>
      <div className="container">
        <SearchBar
          setWeatherData={setWeatherData}
          shouldFetch={fechFromSearchBar}
          setShouldFetch={setFechFromSearchBar}
        />
        <WeatherArea
          weatherData={weatherData}
          message="Search for the city where you want to see the weather!"
        />
        <RecentSearches
          history={history}
          setWeatherData={setWeatherData}
          shouldFetch={fechFromHistory}
          setShouldFetch={setFechFromHistory}
        />
      </div>
    </MainWrapper>
  );
}

export default DisplayWeather;
