import { getWeatherData, processWeatherData } from "./api.js";
import { showError, updateHeroClock, displayWeather, getSearchValue, toggleLoading, setWeatherCardVisible } from "./dom.js";
/** @typedef {import('./api.js').WeatherData} WeatherData */


/**
 * Handles form submission: validates input, toggles loading state, 
 * fetches weather data, and manages UI transitions.
 * @async
 * @function handleFormSubmission
 * @param {SubmitEvent} event - The event object from the form submission.
 * @returns {Promise<void>}
 */
async function handleFormSubmission(event) {
    event.preventDefault();

    // DATA EXTRACTION
    const locationName = getSearchValue();
    if (!locationName) return;

    // PRE-FETCH UI STATE
    toggleLoading(true);
    setWeatherCardVisible(false);

    try {
        // Artificial delay for UI feedback
        await new Promise(resolve => setTimeout(resolve, 500));

        // DATA FETCHING & PROCESSING
        const rawData = await getWeatherData(locationName);
        if (!rawData) throw new Error(`Location "${locationName}" not found.`);

        const simplifiedWeather = processWeatherData(rawData);

        // SUCCESS UI STATE
        displayWeather(simplifiedWeather);
        setWeatherCardVisible(true);

    } catch (error) {
        console.error("Workflow Error:", error);
        showError(error.message);
    } finally {
        // CLEANUP: Reset UI state by turning off the loader, regardless of success or error
        toggleLoading(false);
    }
};


// Initializing the app
document.addEventListener("DOMContentLoaded", () => {
    // 1. Immediately show the time (The "Hero" before search)
    updateHeroClock();

    // 2. Keep it updated every 60 seconds
    setInterval(updateHeroClock, 60000);

    // 3. Attach the search listener
    document.querySelector("#weatherForm")?.addEventListener("submit", handleFormSubmission);
});