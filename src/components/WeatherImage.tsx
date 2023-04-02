// components/WeatherImage.tsx

import React from "react";
import Image from "next/image";
import weatherIcons from "../data/weatherIcons.json";

interface WeatherImageProps {
  conditionCode: number;
  isDay: number;
}

const WeatherImage: React.FC<WeatherImageProps> = ({
  conditionCode,
  isDay,
}) => {
  const weatherIcon = weatherIcons.find((icon) => icon.code === conditionCode);

  if (!weatherIcon) {
    return null;
  }

  const timeOfDay = isDay ? "day" : "night";
  const imageSrc =
    require(`../images/${timeOfDay}/${weatherIcon.icon}.png`).default;

  return (
    <div>
      <Image
        src={imageSrc}
        alt={`${weatherIcon[timeOfDay]} weather`}
        width={64}
        height={64}
        priority={true}
        className="m-auto"
      />
    </div>
  );
};

export default WeatherImage;
