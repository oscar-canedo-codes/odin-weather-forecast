import { getCurrentDateTime, formatUnixTime } from "./utils";

/** * Retrieves and cleans the user's input from the search field.
 * @function getSearchValue
 * @returns {string|null} The trimmed city name, or null if empty/missing.
 */

export function getSearchValue() {
    const locationInput = document.querySelector("#locationInput");

    if (!locationInput) return null;

    const locationName = locationInput.value.trim();
    return locationName || null;
}

/** * Toggles the visibility of the loading spinner.
 * @function toggleLoading
 * @param {boolean} isVisible - Whether the loader should be shown or hidden.
 * @returns {void}
 */
export function toggleLoading(isVisible) {
    const loadingDiv = document.querySelector("#loading");
    if (!loadingDiv) return;

    if (isVisible) {
        loadingDiv.classList.add("status-message--visible");
    } else {
        loadingDiv.classList.remove("status-message--visible");
    }

}

/**
 * Controls the visibility of the weather result card.
 * @function setWeatherCardVisible
 * @param {boolean} isVisible - If true, reveals the card; if false, hides it.
 * @returns {void}
 */

export function setWeatherCardVisible(isVisible) {
    const weatherCard = document.querySelector("#weatherCard");
    weatherCard.classList.add("weather-card--hidden");
    if (!weatherCard) return;

    if (isVisible) {
        weatherCard.classList.remove("weather-card--hidden");
    } else {
        weatherCard.classList.add("weather-card--hidden");
    }

}

/**
 * Displays an error message inside the Weather Card's grid area.
 * @function showError
 * @param {string} message - The error message to display.
 * @returns {void}
 */
export function showError(message) {
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

/**
 * Updates the persistent Hero text with the current time.
 * @function updateHeroClock
 * @returns {void}
 */
export function updateHeroClock() {
    const timeDisplay = document.querySelector("#localTime");
    if (timeDisplay) {
        timeDisplay.textContent = getCurrentDateTime();
    }
}

/**
 * Updates the Weather Card UI elements, including icon swapping and time formatting.
 * * @function displayWeather
 * @param {Object} data - The processed weather data object.
 * @returns {void}
 */
export function displayWeather(data) {
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