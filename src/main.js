import { getWeatherData, processWeatherData } from "./api.js";
/** @typedef {import('./api.js').WeatherData} WeatherData */


/**
 * Converts Unix timestamp to a 12-hour format string.
 * @param {number} unixTime - Seconds since 1970.
 * @returns {string} e.g., "6:30 AM"
 */
function formatUnixTime(unixTime) {
    const date = new Date(unixTime * 1000);
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

/**
 * Gets the current day and time.
 * @returns {string} e.g., "Monday, 2:30 PM"
 */
function getCurrentDateTime() {
    const now = new Date();
    const options = { weekday: 'long', hour: 'numeric', minute: '2-digit' };
    return now.toLocaleDateString('en-US', options);
}

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
 * Updates the Weather Card UI elements, including icon swapping and time formatting.
 * * @function displayWeather
 * @param {Object} data - The processed weather data object.
 * @returns {void}
 */
function displayWeather(data) {
    const cityName = document.querySelector("#cityName");
    const temperature = document.querySelector("#temperature");
    const weatherIcon = document.querySelector("#weatherIcon");
    const description = document.querySelector("#feels");
    const weatherDetailsGrid = document.querySelector("#weatherDetails");

    // Populate primary display
    cityName.textContent = `${data.city}, ${data.country}`;
    temperature.textContent = `${Math.round(data.temperature)}°C`;

    // Icon Swapping: Using the API icon code to fetch the corresponding image
    weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.iconCode}@2x.png" alt="${data.weatherDescription}">`;

    //Caption
    description.textContent = `${data.weatherDescription} · Feels like ${Math.round(data.feelsLike)}°C`;

    // Injecting formatted data into the grid
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
            <p class="forecast-card__value">${formatUnixTime(data.sunrise)}</p>
        </div>
        <div class="forecast-card">
            <p class="forecast-card__label">Sunset</p>
            <p class="forecast-card__value">${formatUnixTime(data.sunset)}</p>
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