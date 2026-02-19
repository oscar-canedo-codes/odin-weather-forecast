import { getWeatherData, processWeatherData } from "./api.js";
/** @typedef {import('./api.js').WeatherData} WeatherData */

/**
 * Handles form submission for fetching, processing, and displaying weather data.
 * @async
 * @function handleFormSubmission
 * @param {SubmitEvent} event - The event object from the form submission.
 * @returns {Promise<void>}
 */
async function handleFormSubmission(event) {
    event.preventDefault();

    // SELECT relevant DOM elements
    const locationInput = document.querySelector("#locationInput");
    const weatherInfoDiv = document.querySelector("#weatherInfo");
    const weatherDetailsDiv = document.querySelector("#weatherDetails");
    const loadingDiv = document.querySelector("#loading");

    // CHECK for DOM elements
    if (!locationInput || !weatherInfoDiv || !weatherDetailsDiv) {
        console.error("Required elements are missing in the DOM.");
        return;
    }

    const locationName = locationInput.value.trim();

    // VALIDATE user input
    if (!locationName) {
        weatherInfoDiv.classList.add("weather-app--hidden");
        weatherDetailsDiv.innerHTML = `<p>Error: Please enter a location.</p>`;
        return;
    }

    // SHOW loading indicator
    loadingDiv.classList.add("weather-forecast__loading--visible");

    try {
        // FETCH raw weather data
        const rawData = await getWeatherData(locationName);
        console.log(rawData);


        if (!rawData) {
            weatherInfoDiv.classList.add("weather-app--hidden");
            weatherDetailsDiv.innerHTML = `<p>Error: Failed to fetch weather data for "${locationName}".</p>`;
            return;
        }

        // PROCESS raw data
        const simplifiedWeather = processWeatherData(rawData);
        console.log(simplifiedWeather);

        if (!simplifiedWeather) {
            weatherInfoDiv.classList.add("weather-app--hidden");
            weatherDetailsDiv.innerHTML = `<p>Error: Weather data processing failed for "${locationName}".</p>`;
            return;
        }

        // DISPLAY processed data
        displayWeather(simplifiedWeather);
    } catch (error) {
        console.error("Error during form submission workflow:", error);
        loadingDiv.classList.remove("weather-forecast__loading--visible");
        weatherInfoDiv.classList.add("weather-app--hidden");
        weatherDetailsDiv.innerHTML = `<p>Error: An unexpected error occurred.</p>`;
    }
    // HIDE loading indicator after data is displayed or error occurs
    loadingDiv.classList.remove("weather-forecast__loading--visible");
}

/**
 * Updates the DOM with processed weather data.
 *
 * @function displayWeather
 * @param {WeatherData} simplifiedWeather - The processed weather data object.
 * @returns {void}
 */
function displayWeather(simplifiedWeather) {
    // SELECT relevant DOM elements
    const weatherInfoDiv = document.querySelector("#weatherInfo");
    const weatherDetailsDiv = document.querySelector("#weatherDetails");
    const weatherHeroCityDiv = document.querySelector("#cityName");
    const weatherHeroCountryDiv = document.querySelector("#countryCode");
    const weatherHeroIconDiv = document.querySelector("#weatherIcon");
    const weatherHeroTempDiv = document.querySelector("#temperature");


    // CHECK for DOM elements
    if (!weatherInfoDiv || !weatherDetailsDiv || !weatherHeroCityDiv || !weatherHeroCountryDiv) {
        console.error("Required DOM elements for weather display are missing.");
        return;
    }

    // UPDATE hero section in the DOM
    weatherHeroCityDiv.textContent = `${simplifiedWeather.city}`;
    weatherHeroCountryDiv.textContent = `${simplifiedWeather.country}`;


    // ICON
    //weatherHeroIconDiv

    // TEMP
    weatherHeroTempDiv.textContent = `${simplifiedWeather.temperature}`;


    // POPULATE the weather details in the DOM
    weatherDetailsDiv.innerHTML = `
        <p><strong>Temperature:</strong> ${simplifiedWeather.temperature}°C</p>
        <p><strong>Weather:</strong> ${simplifiedWeather.weatherDescription}</p>
        <p><strong>Wind Speed:</strong> ${simplifiedWeather.windSpeed} m/s</p>
    `;
    weatherInfoDiv.classList.remove("weather-app--hidden"); // Ensure the weather info section is visible
}

// ATTACH event listener to the form
document
    .querySelector("#weatherForm")
    ?.addEventListener("submit", handleFormSubmission);
