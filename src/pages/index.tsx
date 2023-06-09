import Head from "next/head";
import { useState } from "react";
import {
  SimpleGrid,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import WeatherDisplay from "@/components/WeatherDisplay";
import Navbar from "@/components/NavBar";
import Clock from "@/components/Clock";
import WeatherImage from "@/components/WeatherImage";

export default function Home() {
  const [weatherData, setWeatherData] = useState<any>(null);

  const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString);
    const currentDate = new Date(
      date.getTime() + date.getTimezoneOffset() * 60000
    );
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[currentDate.getDay()];
  };

  return (
    <>
      <Head>
        <title>Weather Planet: Weather, Forecasts, and time</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-[100%] bg-white dark:bg-[#20232a] text-black dark:text-white">
        <Navbar />
        {weatherData ? (
          <div className="">
            <div className="p-4 h-screen m-auto rounded-2xl">
              <div className="m-[100px]"></div>
              <WeatherImage
                conditionCode={weatherData.current.condition.code}
                isDay={weatherData.current.is_day}
              />
              <h2 className="text-2xl text-center">
                {weatherData.location.name}, {weatherData.location.region}
              </h2>

              <Clock weatherData={weatherData} />
              <br />
              <WeatherDisplay
                initialLocation=""
                setWeatherData={setWeatherData}
              />

              <br />
              <br />

              <SimpleGrid
                minChildWidth="220px"
                spacing="90px"
                className="text-black overflow-auto dark:text-white w-[90%] md:w-[60%] m-auto bg-transparent border-2 border-black border-solid rounded-2xl shadow-xl"
              >
                <Box
                  height="320px"
                  borderRadius="25px"
                  padding="10px"
                  className="text-center bg-transparent"
                >
                  <Table size="md" variant="simple" className="w-full">
                    <Thead>
                      <Tr>
                        <Th>Data</Th>
                        <Th>Value</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>Current Condition</Td>
                        <Td>{weatherData.current.condition.text}</Td>
                      </Tr>
                      <Tr>
                        <Td>Current Temp.</Td>
                        <Td>{weatherData.current.temp_f} °F</Td>
                      </Tr>
                      <Tr>
                        <Td>Max Temp.</Td>
                        <Td>
                          {weatherData.forecast.forecastday[0].day.maxtemp_f} °F
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Min Temp.</Td>
                        <Td>
                          {weatherData.forecast.forecastday[0].day.mintemp_f} °F
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Wind Speed</Td>
                        <Td>{weatherData.current.wind_mph} mph</Td>
                      </Tr>
                      <Tr>
                        <Td>Gust Speed</Td>
                        <Td>{weatherData.current.gust_mph} mph</Td>
                      </Tr>
                      <Tr>
                        <Td>Wind Direction</Td>
                        <Td>{weatherData.current.wind_dir}</Td>
                      </Tr>
                      <Tr>
                        <Td>Wind Degree</Td>
                        <Td>{weatherData.current.wind_degree}</Td>
                      </Tr>
                      <Tr>
                        <Td>Humidity</Td>
                        <Td>{weatherData.current.humidity} %</Td>
                      </Tr>
                      <Tr>
                        <Td>Precipitation</Td>
                        <Td>{weatherData.current.precip_in} in</Td>
                      </Tr>
                      <Tr>
                        <Td>Cloud Coverage</Td>
                        <Td>{weatherData.current.cloud} %</Td>
                      </Tr>
                      <Tr>
                        <Td>Visibility</Td>
                        <Td>{weatherData.current.vis_miles} miles</Td>
                      </Tr>
                      <Tr>
                        <Td>UV Index</Td>
                        <Td>{weatherData.current.uv}</Td>
                      </Tr>
                      <Tr>
                        <Td>Humidity</Td>
                        <Td>{weatherData.current.humidity} %</Td>
                      </Tr>
                      {/* Add more rows as needed */}
                    </Tbody>
                  </Table>
                </Box>
              </SimpleGrid>
            </div>

            <br />
            <br />

            <div className="w-[80%] m-auto">
              <SimpleGrid
                minChildWidth="300px"
                spacingX="140px"
                spacingY="100px"
                className="text-black dark:text-white ml-[20px] mr-[20px] mt-[90px] mb-[90px]"
              >
                {weatherData.forecast.forecastday.slice(1).map((day: any) => (
                  <Box
                    key={day.date}
                    height="320px"
                    borderRadius="25px"
                    padding="10px"
                    className="text-center bg-transparent"
                  >
                    <p className="w-[100%] border-b-2 border-solid border-black p-2 font-bold text-xl">
                      {getDayOfWeek(day.date)}
                    </p>
                    <p className="text-md">{day.date}</p>
                    <WeatherImage
                      conditionCode={day.day.condition.code}
                      isDay={1}
                    />

                    <p className="text-lg">
                      Condition: {day.day.condition.text}
                    </p>
                    <p className="text-lg">
                      Temperature: {day.day.avgtemp_f}°F
                    </p>
                    <p className="text-lg">
                      Precipitation chance: {day.day.daily_chance_of_rain}%
                    </p>
                  </Box>
                ))}
              </SimpleGrid>
            </div>
          </div>
        ) : (
          <>
            <Clock weatherData={weatherData} />
            <div className="m-[50px]"></div>
            <WeatherDisplay
              initialLocation=""
              setWeatherData={setWeatherData}
            />
          </>
        )}
      </main>
    </>
  );
}
