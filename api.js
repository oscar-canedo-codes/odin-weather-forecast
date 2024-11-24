/**
 * Fetches weather data for a given location from the OpenWeather API.
 * @param {string} locationName - The name of the location to fetch weather data for.
 * @returns {Promise<Object|null>} A Promise resolving to the raw weather data object, or null if an error occurs.
 */
export async function getWeatherData(locationName) {
    const apiKey = "016f435b9b884308e666856c79dac74c";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const rawData = await response.json();
        console.log("API Response:", rawData);
        return rawData;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
}
// TEST the function - hardcoded data
(async function testAPI() {
    const locationName = "London"; // Hardcoded for testing
    const data = await getWeatherData(locationName);
    console.log("Test API Data:", data);
})();

/**
 * Processes raw weather data to extract relevant fields.
 * @param {Object} rawData - The raw weather data fetched from the API.
 * @param {Object} rawData.main - Contains temperature and other weather metrics.
 * @param {Object[]} rawData.weather - Array of weather description objects.
 * @param {Object} rawData.wind - Contains wind speed data.
 * @returns {Object|null} An object with extracted weather data (temperature, description, wind speed), or null if rawData is invalid.
 */

export function processWeatherData(rawData) {
    if (!rawData) return null;
    return {
        temperature: rawData.main.temp,
        weatherDescription: rawData.weather[0].description,
        windSpeed: rawData.wind.speed,
    };
}

// TEST the function - hardcoded data
(async function testProcessing() {
    const locationName = "London";
    const rawData = await getWeatherData(locationName);
    if (!rawData) {
        console.log("No data to process.");
        return;
    }
    const processedData = processWeatherData(rawData);
    console.log("Processed Data:", processedData);
})();
