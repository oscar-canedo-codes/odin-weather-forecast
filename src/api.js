/**
 * Fetches weather data for a given location from the OpenWeather API.
 *
 * @function getWeatherData
 * @param {string} locationName - The name of the location to fetch weather data for.
 * @returns {Promise<Object|null>} A Promise resolving to the raw weather data object, or null if an error occurs.
 */
export async function getWeatherData(locationName) {
    const apiKey = "016f435b9b884308e666856c79dac74c";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);

        if (!response.ok) throw new Error("Failed to fetch weather data.");
        const rawData = await response.json(); // Raw data from the API
        return rawData;
    } catch (error) {
        console.error("Error fetching weather data:", error); // Log errors if API fails
        return null; // Return null to signal failure
    }
}

/**
 * Processes raw weather data to extract relevant fields.
 *
 * @function processWeatherData
 * @param {Object} rawData - The raw weather data fetched from the API.
 * @returns {Object|null} An object with extracted weather data (temperature, description, wind speed), or null if rawData is invalid.
 */
export function processWeatherData(rawData) {
    if (!rawData) return null;
    return {
        name: rawData.name,
        country: rawData.sys.country,
        temperature: rawData.main.temp,
        weatherDescription: rawData.weather[0].description,
        windSpeed: rawData.wind.speed,
    };
}
