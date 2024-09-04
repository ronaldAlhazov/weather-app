import React from "react";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { HeaderWrapper, AppName, AppIconWrapper } from "./HeaderStyles";

function WeatherHeader() {
  return (
    <HeaderWrapper>
      <AppName>Weather App </AppName>
      <AppIconWrapper>
        <TiWeatherPartlySunny size={30} />
      </AppIconWrapper>
    </HeaderWrapper>
  );
}

export default WeatherHeader;
