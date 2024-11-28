import { getWeatherData, processWeatherData } from "./api.js";

/**
 * Handles form submission for fetching, processing, and displaying weather data.
 * - Validates user input for location.
 * - Fetches raw weather data from the API based on user input.
 * - Processes the raw data to extract meaningful weather information.
 * - Updates the DOM with the processed data or displays error messages if applicable.
 *
 * @async
 * @function handleFormSubmission
 * @param {Event} event - The event object from the form submission.
 * @returns {void}
 */
async function handleFormSubmission(event) {
    event.preventDefault();

    // SELECT relevant DOM elements
    const locationInput = document.querySelector("#locationInput");
    const weatherInfoDiv = document.querySelector("#weatherInfo");
    const weatherDetailsDiv = document.querySelector("#weatherDetails");

    // CHECK for DOM elements
    if (!locationInput || !weatherInfoDiv || !weatherDetailsDiv) {
        console.error("Required elements are missing in the DOM.");
        return;
    }

    const locationName = locationInput.value.trim();

    // VALIDATE user input
    if (!locationName) {
        weatherInfoDiv.classList.add("hidden");
        weatherDetailsDiv.innerHTML = `<p>Error: Please enter a location.</p>`;
        return;
    }

    try {
        // FETCH raw weather data
        const rawData = await getWeatherData(locationName);

        if (!rawData) {
            weatherInfoDiv.classList.add("hidden");
            weatherDetailsDiv.innerHTML = `<p>Error: Failed to fetch weather data for "${locationName}".</p>`;
            return;
        }

        // PROCESS raw data
        const simplifiedWeather = processWeatherData(rawData);

        if (!simplifiedWeather) {
            weatherInfoDiv.classList.add("hidden");
            weatherDetailsDiv.innerHTML = `<p>Error: Weather data processing failed for "${locationName}".</p>`;
            return;
        }

        // DISPLAY processed data
        displayWeather(simplifiedWeather);
    } catch (error) {
        console.error("Error during form submission workflow:", error);
        weatherInfoDiv.classList.add("hidden");
        weatherDetailsDiv.innerHTML = `<p>Error: An unexpected error occurred.</p>`;
    }
}

/**
 * Updates the DOM with processed weather data.
 *
 * @function displayWeather
 * @param {Object} simplifiedWeather - The processed weather data.
 * @param {number} simplifiedWeather.temperature - Temperature in Celsius.
 * @param {string} simplifiedWeather.weatherDescription - Description of the weather (e.g., "clear sky").
 * @param {number} simplifiedWeather.windSpeed - Wind speed in meters per second.
 * @returns {void}
 */
function displayWeather(simplifiedWeather) {
    // SELECT relevant DOM elements
    const weatherInfoDiv = document.querySelector("#weatherInfo");
    const weatherDetailsDiv = document.querySelector("#weatherDetails");

    // CHECK for DOM elements
    if (!weatherInfoDiv || !weatherDetailsDiv) {
        console.error("Required DOM elements for weather display are missing.");
        return;
    }

    // POPULATE the weather details in the DOM
    weatherDetailsDiv.innerHTML = `
        <p><strong>Temperature:</strong> ${simplifiedWeather.temperature}°C</p>
        <p><strong>Weather:</strong> ${simplifiedWeather.weatherDescription}</p>
        <p><strong>Wind Speed:</strong> ${simplifiedWeather.windSpeed} m/s</p>
    `;
    weatherInfoDiv.classList.remove("hidden"); // Ensure the weather info section is visible
}

// ATTACH event listener to the form
document
    .querySelector("#weatherForm")
    ?.addEventListener("submit", handleFormSubmission);