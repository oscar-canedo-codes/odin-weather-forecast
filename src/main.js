import { getWeatherData, processWeatherData } from "./api.js";

/**
 * Handles form submission for fetching, processing, and displaying weather data.
 * - Validates user input for location.
 * - Manages UI states by toggling loading indicators and visibility modifiers.
 * - Fetches raw weather data from the API based on user input.
 * - Processes the raw data to extract meaningful weather information.
 * - Updates the DOM with the processed data or displays error messages if applicable.
 *
 * @async
 * @function handleFormSubmission
 * @param {Event} event - The submit event from the weather form. 
 */
async function handleFormSubmission(event) {
    event.preventDefault();

    // SELECT relevant DOM elements
    const locationInput = document.querySelector("#locationInput");
    const loadingDiv = document.querySelector("#loading");
    const weatherInfoDiv = document.querySelector("#weatherInfo");
    const weatherDetailsDiv = document.querySelector("#weatherDetails");

    // CHECK for DOM elements
    if (!locationInput || !loadingDiv || !weatherInfoDiv || !weatherDetailsDiv) {
        console.error("Required elements are missing in the DOM.");
        return;
    }

    const locationName = locationInput.value.trim();

    // VALIDATION //

    // VALIDATE user input
    if (!locationName) {
        // HIDE old results and SHOW error message
        weatherInfoDiv.classList.add("details-panel--hidden");
        weatherDetailsDiv.innerHTML = `<p class="error-text">Please enter a location.</p>`;
        // DISPLAY error message
        weatherInfoDiv.classList.remove("details-panel--hidden");
        return;
    }

    // RESET (PRE-FETCH) //

    // SHOW loading indicator
    loadingDiv.classList.add("status-message--visible");
    // HIDE results panel while loading
    weatherInfoDiv.classList.add("details-panel--hidden");

    try {
        // DATA //

        // FETCH raw weather data
        const rawData = await getWeatherData(locationName);

        // SHOW error in details box IF API fails
        if (!rawData) {
            weatherDetailsDiv.innerHTML = `<p class="error-text">City "${locationName}" not found.</p>`;
            weatherInfoDiv.classList.remove("details-panel--hidden");
            return;
        }

        // PROCESS raw data
        const simplifiedWeather = processWeatherData(rawData);

        // DISPLAY // 

        // DISPLAY processed data
        displayWeather(simplifiedWeather);

    } catch (error) {
        console.error("Workflow Error:", error);
        weatherDetailsDiv.innerHTML = `<p class="error-text">Network error. Please try again.</p>`;
        weatherInfoDiv.classList.remove("details-panel--hidden");
    } finally {
        // CLEAN UP //

        // ALWAYS HIDE loading (success or error)
        loadingDiv.classList.remove("status-message--visible");
    }
}

/**
 * Updates the DOM with processed weather data.
 * - Populates the hero section with city and country information.
 * - Updates the main display with current temperature.
 * - Injects detailed weather conditions into the details grid.
 * - Reveals the details panel by removing visibility modifiers.
 *
 * @function displayWeather
 * @param {Object} simplifiedWeather - The processed weather data.
 * @param {string} simplifiedWeather.name - The name of the city.
 * @param {string} simplifiedWeather.country - The country code.
 * @param {number} simplifiedWeather.temperature - Temperature in Celsius.
 * @param {string} simplifiedWeather.weatherDescription - Description of weather.
 * @param {number} simplifiedWeather.windSpeed - Wind speed in meters per second.
 * @returns {void}
 */

function displayWeather(simplifiedWeather) {
    // SELECT relevant DOM elements
    const cityName = document.querySelector("#cityName");
    const countryCode = document.querySelector("#countryCode");
    const tempDisplay = document.querySelector("#temperature");
    const weatherInfoDiv = document.querySelector("#weatherInfo");
    const weatherDetailsDiv = document.querySelector("#weatherDetails");

    // UPDATE the HERO section
    if (cityName) cityName.textContent = simplifiedWeather.name;
    if (countryCode) countryCode.textContent = simplifiedWeather.country;

    // UPDATE the MAIN DISPLAY 
    if (tempDisplay) tempDisplay.textContent = `${simplifiedWeather.temperature}°C`;

    // UPDATE the DETAILS GRID 
    weatherDetailsDiv.innerHTML = `
        <div class="forecast-card">
            <p class="forecast-card__label">Condition</p>
            <p class="forecast-card__value">${simplifiedWeather.weatherDescription}</p>
        </div>
        <div class="forecast-card">
            <p class="forecast-card__label">Wind Speed</p>
            <p class="forecast-card__value">${simplifiedWeather.windSpeed} m/s</p>
        </div>
    `;

    // UNHIDE the panel
    weatherInfoDiv.classList.remove("details-panel--hidden");
}

// ATTACH event listener to the form
document
    .querySelector("#weatherForm")
    ?.addEventListener("submit", handleFormSubmission);