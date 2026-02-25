import { getWeatherData, processWeatherData } from "./api.js";
import { showError, updateHeroClock, displayWeather, getSearchValue, toggleLoading, setWeatherCardVisible } from "./dom.js";
/** @typedef {import('./api.js').WeatherData} WeatherData */

// TODO feat: handleUnitToggle to switch unit settings metric/imperial.
// Subtasks:
// [x] 1. Update API call to accept `unit` as a parameter (api.js).
// [x] 2. Pass `currentUnit` through handleFormSubmission (main.js).
// [ ] 3. MOVE UI Logic to dom.js:
//      - Create updateUnitUI(unit) to toggle button 'active' classes.
//      - Update displayWeather(data, unit) to show correct labels (°C/°F).

// TRACK the current unit system globally
let currentUnit = 'metric';

/** Handles the unit toggle button clicks.
 * @function handleUnitToggle
 * @param { PointerEvent } event - The click event.
 */
function handleUnitToggle(event) {
    const clickedBtn = event.target;
    const newUnit = clickedBtn.dataset.unit;

    // 1. Only act if the unit actually changed
    if (newUnit === currentUnit) return;

    // 2. Update global state
    currentUnit = newUnit;

    // 3. Update UI (Visual active state)
    document.querySelectorAll(".unit-settings__toggle").forEach(btn => {
        btn.classList.remove("unit-settings__toggle--active");
    });
    clickedBtn.classList.add("unit-settings__toggle--active");

    // 4. Re-trigger search if there is already a city in the input
    const locationInput = document.querySelector("#locationInput");
    if (locationInput.value.trim()) {
        handleFormSubmission(new Event('submit'));
    }
}

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
        const rawData = await getWeatherData(locationName, currentUnit);
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

    // 3. Initialize toggle listeners
    document.querySelectorAll(".unit-settings__toggle").forEach(btn => {
        btn.addEventListener("click", handleUnitToggle);
    });

    // 4. Attach the search listener
    document.querySelector("#weatherForm")?.addEventListener("submit", handleFormSubmission);
});