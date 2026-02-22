import { getWeatherData, processWeatherData } from "./api.js";
/** @typedef {import('./api.js').WeatherData} WeatherData */

/**
 * Handles form submission: validates input, shows/hides the loading spinner, 
 * fetches data, and updates the display or shows an error.
 * @async
 * @function handleFormSubmission
 * @param {SubmitEvent} event - The event object from the form submission.
 * @returns {Promise<void>}
 */
async function handleFormSubmission(event) {
    event.preventDefault();

    const locationInput = document.querySelector("#locationInput");
    const loadingDiv = document.querySelector("#loading");
    const heroSection = document.querySelector("#hero");
    const weatherInfoDiv = document.querySelector("#weatherInfo");
    const weatherDetailsDiv = document.querySelector("#weatherDetails");

    if (!locationInput || !loadingDiv || !weatherInfoDiv || !weatherDetailsDiv) return;

    const locationName = locationInput.value.trim();

    if (!locationName) {
        showError("Please enter a location.");
        return;
    }


    // HIDE current content & SHOW loader
    heroSection.classList.add("hero--hidden");
    weatherInfoDiv.classList.add("details-panel--hidden");

    loadingDiv.classList.add("status-message--visible");

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));

        const rawData = await getWeatherData(locationName);

        if (!rawData) {

            throw new Error(`Location "${locationName}" not found.`);

        }

        // DISPLAY SUCCESS

        const simplifiedWeather = processWeatherData(rawData);

        displayWeather(simplifiedWeather);

        // SHOW hero again on success
        heroSection.classList.remove("hero--hidden");

    } catch (error) {
        console.error("Workflow Error:", error);
        showError(error.message);
    } finally {
        // HIDE LOADING SPINNER always
        loadingDiv.classList.remove("status-message--visible");
    }
}

/**
 * Updates the Hero and Details sections of the DOM.
 * @function displayWeather
 * @param {WeatherData} data - The processed weather data object.
 * @returns {void}
 */
function displayWeather(data) {
    const cityName = document.querySelector("#cityName");
    const countryCode = document.querySelector("#countryCode");
    const temperature = document.querySelector("#temperature");
    const weatherDetails = document.querySelector("#weatherDetails");
    const weatherInfo = document.querySelector("#weatherInfo");

    if (!cityName || !temperature || !weatherInfo) return;

    // UPDATE HERO INFORMATION
    cityName.textContent = data.city;
    countryCode.textContent = data.country;
    temperature.textContent = `${Math.round(data.temperature)}°C`;

    // UPDATE DETAILS GRID
    weatherDetails.innerHTML = `
<div class="forecast-card">
            <p class="forecast-card__label">Wind Speed</p>
            <p class="forecast-card__value">${data.windSpeed} m/s</p>
        </div>
        <div class="forecast-card">
            <p class="forecast-card__label">Condition</p>
            <p class="forecast-card__value">${data.weatherDescription}</p>
        </div>
    `;

    // REVEAL THE PANEL
    weatherInfo.classList.remove("details-panel--hidden");
}

/**
 * Injects an error message into the weather details area.
 * @function showError
 * @param {string} message - The error message to display.
 * @returns {void}
 */
function showError(message) {
    const weatherDetails = document.querySelector("#weatherDetails");
    const weatherInfo = document.querySelector("#weatherInfo");

    if (!weatherDetails || !weatherInfo) return;

    // IF ERROR HIDE HERO
    if (heroSection) heroSection.classList.add("hero--hidden");

    weatherDetails.innerHTML = `
    <div style="grid-column: 1 / -1; text-align: center; color: var(--warning-red);">
        <i class="fa-solid fa-triangle-exclamation" style="font-size: 2rem; margin-bottom: 10px;"></i>
        <p>${message}</p>
    </div>
    `;

    weatherInfo.classList.remove("details-panel--hidden");
}

// ATTACH event listener to the form
document
    .querySelector("#weatherForm")
    ?.addEventListener("submit", handleFormSubmission);
