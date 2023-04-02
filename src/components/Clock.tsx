// components/Clock.tsx

import { useEffect, useState } from "react";

interface ClockProps {
  weatherData: any;
}

const Clock: React.FC<ClockProps> = ({ weatherData }) => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    if (weatherData && weatherData.location) {
      const localTime = new Date(weatherData.location.localtime);
      setCurrentTime(localTime);
    }
  }, [weatherData]);

  useEffect(() => {
    if (currentTime) {
      const timeDifference = 1000 - currentTime.getMilliseconds();
      const syncTimer = setTimeout(() => {
        setCurrentTime((prevTime) => {
          if (prevTime) {
            return new Date(prevTime.getTime() + timeDifference);
          }
          return prevTime;
        });
      }, timeDifference);

      const timer = setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime) {
            return new Date(prevTime.getTime() + 1000);
          }
          return prevTime;
        });
      }, 1000);

      return () => {
        clearTimeout(syncTimer);
        clearInterval(timer);
      };
    }
  }, [currentTime]);

  return (
    <div>
      {currentTime ? (
        <p className="neon-text text-black dark:text-white text-center text-3xl">
          {currentTime.toLocaleTimeString()}
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Clock;
