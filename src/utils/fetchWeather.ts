export const fetchWeather = async (query: string) => {
  try {
    const response = await fetch(`/api/weather?query=${query}`);

    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    throw error;
  }
};
