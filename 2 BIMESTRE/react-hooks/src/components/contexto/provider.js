import { useState } from "react";
import { WeatherContext } from "./context";

export function WeatherProvider({ children }) {

    const [weather, setWeather] = useState("Storm!")


    return (
        <WeatherContext.Provider value={weather}>

            {children}
        </WeatherContext.Provider>
    );
}