import React from "react";
import { WeatherDataProps } from "./DataFetch";
import { WiHumidity } from "react-icons/wi";
import {
  BsFillSunFill,
  BsCloudyFill,
  BsFillCloudRainFill,
  BsCloudFog2Fill,
} from "react-icons/bs";
import { FaWind } from "react-icons/fa";
import { TiWeatherPartlySunny } from "react-icons/ti";
interface WeatherAreaProps {
  weatherData: WeatherDataProps | null;
  message: string;
}

const WeatherArea: React.FC<WeatherAreaProps> = ({ weatherData, message }) => {
  const iconChanger = (weather: string) => {
    let iconElement: React.ReactNode;
    let iconColor: string;

    switch (weather) {
      case "Rain":
        iconElement = <BsFillCloudRainFill />;
        iconColor = "#272829";
        break;

      case "Clear":
        iconElement = <BsFillSunFill />;
        iconColor = "#FFC436";
        break;
      case "Clouds":
        iconElement = <BsCloudyFill />;
        iconColor = "#102C57";
        break;

      case "Mist":
        iconElement = <BsCloudFog2Fill />;
        iconColor = "#279EFF";
        break;
      default:
        iconElement = <TiWeatherPartlySunny />;
        iconColor = "#7B2869";
    }

    return (
      <span className="icon" style={{ color: iconColor }}>
        {iconElement}
      </span>
    );
  };
  return (
    <>
      {weatherData ? (
        <div>
          <div className="weatherArea">
            <h1>{weatherData.name} </h1>
            <span>{weatherData.sys.country}</span>
            <div className="icon">
              {iconChanger(weatherData.weather[0].main)}
            </div>
            <h1>{weatherData.main.temp}°C</h1>
            <h2>{weatherData.weather[0].main}</h2>
          </div>
          <div className="bottomInfoArea">
            <div className="humidityLevel">
              <WiHumidity className="windIcon" />
              <div className="humidInfo">
                <h1>{weatherData.main.humidity}%</h1>
                <p>Humidity</p>
              </div>
            </div>
            <div className="wind">
              <FaWind className="windIcon" />
              <div className="humidInfo">
                <h1>{weatherData.wind.speed} km/h</h1>
                <p>Wind speed</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="weatherArea">
          <p>{message}</p>
        </div>
      )}
    </>
  );
};

export default WeatherArea;
