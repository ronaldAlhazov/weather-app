// RecentSearches.tsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { WeatherDataProps, fetchCurrentWeather } from "./DataFetch";
import { useQuery } from "@tanstack/react-query";

interface RecentSearchesProps {
  history: string[];
  setWeatherData: (data: WeatherDataProps) => void;
  shouldFetch: boolean;
  setShouldFetch: (data: boolean) => void;
}

const Title = styled.h1`
  font-size: 1.2rem;
  color: #333;
  margin: 0;
  padding: 8px;
  border-bottom: 1px solid #ccc;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  text-align: center; /* Center text horizontally */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem; /* Adjust font size */
  height: 20px;
  &:hover {
    background-color: #c2cfc2; /* Light gray background on hover */
    border-color: #ccc;
  }
`;

const RecentSearches: React.FC<RecentSearchesProps> = ({
  history,
  setWeatherData,
  shouldFetch,
  setShouldFetch,
}) => {
  const [cityName, setCityName] = useState("");
  const {
    data: weatherData,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["weatherByCity", cityName],
    queryFn: () =>
      fetchCurrentWeather("byCity", undefined, undefined, cityName),
    enabled: shouldFetch,
  });

  useEffect(() => {
    if (isSuccess) {
      setShouldFetch(false);
      setWeatherData(weatherData);
    }
    if (isError) {
      alert(error?.message || "An error occurred");
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (cityName) {
      setShouldFetch(true);
    }
  }, [cityName]);

  return (
    <div>
      <Title>Recent Searches</Title>
      <List>
        {history.length > 0 &&
          history.map((option, index) => (
            <ListItem
              key={index}
              onClick={() => {
                setCityName(option);
              }}
            >
              <h2>{option}</h2>
            </ListItem>
          ))}
      </List>
    </div>
  );
};

export default RecentSearches;
