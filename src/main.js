import { getWeatherData, processWeatherData } from "./api.js";
import { toggleLoader, displayWeather, displayError, clearUI } from "./dom.js";

/**
* Orchestrates the weather fetching workflow:
 * 1. Validates input.
 * 2. Signals UI to show loading state.
 * 3. Coordinates data fetching and processing.
 * 4. Signals UI to display results or errors.
 *
 * @async
 * @function handleFormSubmission
 * @param {Event} event - The submit event from the weather form. 
 */
async function handleFormSubmission(event) {
    event.preventDefault();

    // SELECT  DOM elements
    const locationInput = document.querySelector("#locationInput");
    const locationName = locationInput.value.trim();

    // VALIDATION //

    if (!locationName) {
        displayError("Please enter a location.");
        return;
    }

    // (CLEAR UI) //
    clearUI();

    // START loader
    toggleLoader(true);

    try {
        // DATA //

        // FETCH raw weather data
        const rawData = await getWeatherData(locationName);

        // SHOW error in details box IF API fails
        if (!rawData) {
            displayError(`City "${locationName}" not found.`);
            return;
        }

        // PROCESS raw data
        const simplifiedWeather = processWeatherData(rawData);

        // DISPLAY // 

        // DISPLAY processed data
        displayWeather(simplifiedWeather);

    } catch (error) {
        console.error(error)
        displayError("Network error. Please try again.");
    } finally {
        // CLEAN UP //

        // ALWAYS HIDE loading (success or error)
        toggleLoader(false);
    }
}



// ATTACH event listener to the form
document
    .querySelector("#weatherForm")
    ?.addEventListener("submit", handleFormSubmission);