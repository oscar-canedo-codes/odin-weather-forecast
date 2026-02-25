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
 * Generates a localized string of the current date and time in EU format.
 * @function getCurrentDateTime
 * @returns {string} Formatted string (e.g., "Friday 1 April 2022 | 16:33").
 */
function getCurrentDateTime() {
    const now = new Date();

    const weekday = now.toLocaleDateString('en-GB', { weekday: 'long' });
    const day = now.toLocaleDateString('en-GB', { day: 'numeric' });
    const month = now.toLocaleDateString('en-GB', { month: 'long' });
    const year = now.toLocaleDateString('en-GB', { year: 'numeric' });

    const time = now.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    // Assemble manually: [Weekday] [Day] [Month] [Year] | [Time]
    return `${weekday} ${day} ${month} ${year} | ${time}`;
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
 * Converts Unix timestamp to a 12-hour format string.
 * @param {number} unixTime - Seconds since 1970.
 * @returns {string} e.g., "6:30 AM"
 */
function formatUnixTime(unixTime) {
    const date = new Date(unixTime * 1000);
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
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