// components/WeatherDisplay.tsx

import { useState, ChangeEvent, FormEvent } from "react";
import { fetchWeather } from "../utils/fetchWeather";

interface WeatherDisplayProps {
  initialLocation: string;
  setWeatherData: (data: any) => void;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  initialLocation,
  setWeatherData,
}) => {
  const [inputLocation, setInputLocation] = useState<string>(initialLocation);

  const fetchData = async (query: string) => {
    const data = await fetchWeather(query);
    setWeatherData(data);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputLocation(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    fetchData(inputLocation);
  };

  return (
    <div>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter city / zip"
            value={inputLocation}
            onChange={handleChange}
            className="p-1 ml-2 border-2 border-black border-solid bg-white rounded-xl text-black"
          />
          <button
            type="submit"
            className="p-1 ml-2 border-2 border-black border-solid bg-green-400 rounded-xl text-black"
          >
            Get Weather
          </button>
        </form>
      </div>
    </div>
  );
};

export default WeatherDisplay;
