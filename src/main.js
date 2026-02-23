import { getWeatherData, processWeatherData } from "./api.js";
/** @typedef {import('./api.js').WeatherData} WeatherData */

/**
 * Handles form submission: validates input, toggles loading state, 
 * fetches weather data, and manages the visibility of the Weather Card.
 * @async
 * @function handleFormSubmission
 * @param {SubmitEvent} event - The event object from the form submission.
 * @returns {Promise<void>}
 */
async function handleFormSubmission(event) {
    event.preventDefault();

    const locationInput = document.querySelector("#locationInput");
    const loadingDiv = document.querySelector("#loading");
    const weatherCard = document.querySelector("#weatherCard");
    const weatherDetailsGrid = document.querySelector("#weatherDetails");

    if (!locationInput || !loadingDiv || !weatherCard || !weatherDetailsGrid) return;

    const locationName = locationInput.value.trim();
    if (!locationName) return;

    // PRE-FETCH UI STATE: Hide previous results and show loader
    weatherCard.classList.add("weather-card--hidden");
    loadingDiv.classList.add("status-message--visible");

    try {
        // Artificial delay for UI feedback
        await new Promise(resolve => setTimeout(resolve, 1500));

        const rawData = await getWeatherData(locationName);
        if (!rawData) throw new Error(`Location "${locationName}" not found.`);

        const simplifiedWeather = processWeatherData(rawData);

        // SUCCESS: Update and reveal the result
        displayWeather(simplifiedWeather);
        weatherCard.classList.remove("weather-card--hidden");

    } catch (error) {
        console.error("Workflow Error:", error);
        showError(error.message);
    } finally {
        // CLEANUP: Always hide the loader
        loadingDiv.classList.remove("status-message--visible");
    }
}

/**
 * Populates the Weather Card elements and detail grid with processed data.
 * @function displayWeather
 * @param {WeatherData} data - The processed weather data object.
 * @returns {void}
 */
function displayWeather(data) {
    const cityName = document.querySelector("#cityName");
    const temperature = document.querySelector("#temperature");
    const weatherIcon = document.querySelector("#weatherIcon");
    const description = document.querySelector("#feels");
    const weatherDetailsGrid = document.querySelector("#weatherDetails");

    if (!cityName || !temperature || !weatherDetailsGrid) return;

    // Update Left Column
    cityName.textContent = `${data.city}, ${data.country}`;
    temperature.textContent = `${Math.round(data.temperature)}°C`;
    weatherIcon.textContent = data.icon || "☀️";
    description.textContent = data.weatherDescription;

    // Update Right Column Grid (BEM: forecast-card)
    weatherDetailsGrid.innerHTML = `
        <div class="forecast-card">
            <p class="forecast-card__label">Wind Speed</p>
            <p class="forecast-card__value">${data.windSpeed} m/s</p>
        </div>
        <div class="forecast-card">
            <p class="forecast-card__label">Humidity</p>
            <p class="forecast-card__value">${data.humidity}%</p>
        </div>
        <div class="forecast-card">
            <p class="forecast-card__label">Pressure</p>
            <p class="forecast-card__value">${data.pressure} hPa</p>
        </div>
        <div class="forecast-card">
            <p class="forecast-card__label">Sunrise</p>
            <p class="forecast-card__value">${data.sunrise}</p>
        </div>
        <div class="forecast-card">
            <p class="forecast-card__label">Sunset</p>
            <p class="forecast-card__value">${data.sunset}</p>
        </div>
        <div class="forecast-card">
            <p class="forecast-card__label">Visibility</p>
            <p class="forecast-card__value">${data.visibility / 1000} km</p>
        </div>
    `;
}

/**
 * Displays an error message inside the Weather Card's grid area.
 * @function showError
 * @param {string} message - The error message to display.
 * @returns {void}
 */
function showError(message) {
    const weatherDetailsGrid = document.querySelector("#weatherDetails");
    const weatherCard = document.querySelector("#weatherCard");

    if (!weatherDetailsGrid || !weatherCard) return;

    weatherDetailsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; color: var(--warning-red); padding: 20px;">
            <i class="fa-solid fa-circle-exclamation" style="font-size: 2rem;"></i>
            <p>${message}</p>
        </div>
    `;

    weatherCard.classList.remove("weather-card--hidden");
}

// Initializing the app
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#weatherForm")?.addEventListener("submit", handleFormSubmission);
});