import { getWeatherData, processWeatherData } from "./api.js";
import { showError, updateHeroClock, displayWeather } from "./dom.js";
/** @typedef {import('./api.js').WeatherData} WeatherData */

// TODO: Refactor handleFormSubmission to remove direct DOM manipulation.
// Subtasks: 
// 1. Extract input selection to dom.js (getSearchValue).
// 2. Move loading state toggles to dom.js (toggleLoading).
// 3. Move error/success visibility logic to dom.js.
// Current status: Orchestration logic is still coupled with DOM selectors.

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
        await new Promise(resolve => setTimeout(resolve, 500));

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




// Initializing the app
document.addEventListener("DOMContentLoaded", () => {
    // 1. Immediately show the time (The "Hero" before search)
    updateHeroClock();

    // 2. Keep it updated every 60 seconds
    setInterval(updateHeroClock, 60000);

    // 3. Attach the search listener
    document.querySelector("#weatherForm")?.addEventListener("submit", handleFormSubmission);
});