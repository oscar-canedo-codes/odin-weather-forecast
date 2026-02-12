
/**
 * UI Module for Weather App
 * Handles all direct DOM manipulations
 */

/**
 * Toggles the loading spinner visibility.
 * @param {boolean} isLoading - Whether to show or hide the loader.
 */
export function toggleLoader(isLoading) {
    const loader = document.querySelector("#loading");
    if (!loader) return;

    isLoading
        ? loader.classList.add("status-message--visible")
        : loader.classList.remove("status-message--visible");
}
/** 
 * Displays an error message in the UI.
 * @param {string} message - The specific text to show the user.
*/

export function displayError(message) {
    const weatherInfoDiv = document.querySelector("#weatherInfo");
    const weatherDetailsDiv = document.querySelector("#weatherDetails");

    if (!weatherInfoDiv || !weatherDetailsDiv) return;

    // CLEAN slate (HIDE old data)
    weatherInfoDiv.classList.add("details-panel--hidden");

    // SET text
    weatherDetailsDiv.innerHTML = `<p class="error-text">${message}</p>`;

    // REVEAL panel
    weatherInfoDiv.classList.remove("details-panel--hidden");

}

/**
 * Updates the DOM with processed weather data.
 * -Populates the hero section (city/country).
 * - Injects weather details (condition/wind) into the grid.
 * Reveals the panel by removing the hidden modifier class.
 * 
 * @function displayWeather
* @param {Object} simplifiedWeather - The data object created by processWeatherData.
 * @param {string} simplifiedWeather.name - The name of the city.
 * @param {string} simplifiedWeather.country - The two-letter country code.
 * @param {number} simplifiedWeather.temperature - The current temperature value.
 * @param {string} simplifiedWeather.weatherDescription - A short string (e.g., "Cloudy").
 * @param {number} simplifiedWeather.windSpeed - The wind speed value.
 * @returns {void}
 */
export function displayWeather(simplifiedWeather) {
    const cityName = document.querySelector("#cityName");
    const countryCode = document.querySelector("#countryCode");
    const tempDisplay = document.querySelector("#temperature");
    const weatherInfoDiv = document.querySelector("#weatherInfo");
    const weatherDetailsDiv = document.querySelector("#weatherDetails");


    if (cityName) cityName.textContent = simplifiedWeather.name;
    if (countryCode) countryCode.textContent = simplifiedWeather.country;
    if (tempDisplay) tempDisplay.textContent = `${simplifiedWeather.temperature}°C`;

    weatherDetailsDiv.className = "forecast-grid";

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

    weatherInfoDiv.classList.remove("details-panel--hidden");
}

/**
 * Resets the UI to a clean state before a new fetch.
 */
export function clearUI() {
    const weatherInfo = document.querySelector("#weatherInfo");
    if (weatherInfo) weatherInfo.classList.add("details-panel--hidden");
}