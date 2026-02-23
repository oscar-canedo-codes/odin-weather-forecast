/**
 * @typedef {Object} WeatherData
 * @property {string} city - Name of the city.
 * @property {string} country - Country code (e.g., "US").
 * @property {number} temperature - Current temperature in Celsius.
 * @property {number} feelsLike - "Feels like" temperature in Celsius.
 * @property {string} weatherDescription - Brief description of conditions.
 * @property {string} iconCode - The icon ID from OpenWeather.
 * @property {number} windSpeed - Wind speed in m/s.
 * @property {number} humidity - Humidity percentage.
 * @property {number} pressure - Atmospheric pressure in hPa.
 * @property {number} visibility - Visibility in meters.
 * @property {number} sunrise - Sunrise Unix timestamp (UTC).
 * @property {number} sunset - Sunset Unix timestamp (UTC).
 */


/**
 * Fetches raw weather data for a given location from the OpenWeather API.
 *
 * @async
 * @function getWeatherData
 * @param {string} locationName - The name of the location (city) to fetch data for.
 * @returns {Promise<Object|null>} A Promise resolving to the raw API response, or null if the fetch fails.
 */

export async function getWeatherData(locationName) {
    const apiKey = "016f435b9b884308e666856c79dac74c";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);

        if (!response.ok) throw new Error("Failed to fetch weather data.");
        const rawData = await response.json();
        return rawData;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
}

/**
 * Processes raw API weather data to extract and flatten relevant fields.
 *
 * @function processWeatherData
 * @param {Object} rawData - The raw weather data fetched from the API.
 * @returns {WeatherData|null} A simplified weather data object, or null if rawData is invalid.
 */
export function processWeatherData(rawData) {
    if (!rawData) return null;
    return {
        city: rawData.name,
        country: rawData.sys.country,
        temperature: rawData.main.temp,
        feelsLike: rawData.main.feels_like,
        weatherDescription: rawData.weather[0].description,
        iconCode: rawData.weather[0].icon,
        windSpeed: rawData.wind.speed,
        humidity: rawData.main.humidity,
        pressure: rawData.main.pressure,
        visibility: rawData.visibility,
        sunrise: rawData.sys.sunrise,
        sunset: rawData.sys.sunset,
    };
}
