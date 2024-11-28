/**
 * Handles form submissions, fetches weather data, and displays it.
 * Validates user input, fetches weather data, processes it, and displays it.
 */
/* async function setupForm() {
    const locationInput = document.getElementById('locationInput').value.trim();
    if (!locationInput) {
        console.log("Please enter a location.");
        return;
    }

    try {
        const rawData = await getWeatherData(locationInput);
        if (!rawData) {
            console.log("Failed to fetch weather data. Please try again.");
            return;
        }

        const simplifiedWeather = processWeatherData(rawData);
        if (!simplifiedWeather) {
            console.log("Error processing weather data.");
            return;
        }

        displayWeather(simplifiedWeather); // Display processed data
    } catch (error) {
        console.error("Unexpected error in setupForm:", error);
    }
}
*/