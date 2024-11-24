import { getWeatherData, processWeatherData } from './api.js';

function displayWeather(simplifiedWeather) {
    if (!simplifiedWeather) {
        console.log("No weather data to display.");
        return;
    }

    console.log("Displaying Weather Data:");
    console.log(`Temperature: ${simplifiedWeather.temperature}°C`);
    console.log(`Weather: ${simplifiedWeather.weatherDescription}`);
    console.log(`Wind Speed: ${simplifiedWeather.windSpeed} m/s`);
}

// TEST the function - hardcoded data
(async function testDisplay() {
    const locationName = "London"; // Hardcoded for testing
    const rawData = await getWeatherData(locationName);
    if (!rawData) return;

    const processedData = processWeatherData(rawData);
    displayWeather(processedData);
})();

