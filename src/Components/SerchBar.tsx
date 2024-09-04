import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import styled, { keyframes } from "styled-components";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchCurrentWeather, WeatherDataProps } from "./DataFetch";

const flicker = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

// Create a styled paragraph with the flickering animation
const FlickeringParagraph = styled.p`
  color: red;
  font-size: 1.3rem;
  font-family: "Inter", sans-serif;
  margin: 0;
  position: absolute;
  bottom: -25px; /* Adjust based on input field height */
  left: 0;
  width: 100%;
  text-align: center;
  animation: ${flicker} 1s infinite;
`;

interface SearchBarProps {
  setWeatherData: (data: WeatherDataProps) => void;
  shouldFetch: boolean;
  setShouldFetch: (data: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  setWeatherData,
  shouldFetch,
  setShouldFetch,
}) => {
  const [searchCity, setSearchCity] = useState("");
  const [options, setOptions] = useState<{ name: string }[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const api_key = process.env.REACT_APP_API_KEY;
  const api_Endpoint_Geo = process.env.REACT_APP_API_ENDPOINT_GEO;

  const {
    data: weatherData,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["weatherByCity", searchCity],
    queryFn: () =>
      fetchCurrentWeather("byCity", undefined, undefined, searchCity),
    enabled: shouldFetch,
  });

  const getSearchOptions = (value: string) => {
    fetch(`${api_Endpoint_Geo}?q=${value}&limit=5&appid=${api_key}`)
      .then((res) => res.json())
      .then((data) => setOptions(data));
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchCity(val);
    if (val.trim() === "") {
      setOptions([]);
      return;
    }
    getSearchOptions(val);
    setErrorMessage("");
  };

  const handleOptionClick = (cityName: string) => {
    setSearchCity(cityName);
    setOptions([]);
    setErrorMessage("");
  };

  const handleSearchClick = () => {
    if (searchCity.trim().length === 0) {
      setErrorMessage("City name cannot be empty!");
      return;
    }
    setShouldFetch(true);
  };
  useEffect(() => {
    if (isSuccess) {
      setShouldFetch(false);
      setWeatherData(weatherData);
      setErrorMessage("");
    }
    if (isError) {
      setErrorMessage(error?.message || "An error occurred");
    }
  }, [isSuccess, isError]);
  return (
    <div className="searchArea">
      <input
        type="text"
        placeholder="enter a city"
        value={searchCity}
        onChange={onInputChange}
      />
      <ul>
        {options.length > 0 &&
          options.map((option, index) => (
            <li key={index} onClick={() => handleOptionClick(option.name)}>
              <p>{option.name}</p>
            </li>
          ))}
      </ul>
      {errorMessage && (
        <FlickeringParagraph>{errorMessage}</FlickeringParagraph>
      )}
      <IoSearchSharp className="searchIcon" onClick={handleSearchClick} />
    </div>
  );
};

export default SearchBar;
