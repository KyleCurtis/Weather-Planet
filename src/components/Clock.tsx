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

  const formattedTime = (time: Date | null) => {
    if (!time) return "";

    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(time);
  };

  return (
    <div>
      {currentTime ? (
        <p className="neon-text text-black dark:text-white text-center text-3xl">
          {formattedTime(currentTime)}
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Clock;
