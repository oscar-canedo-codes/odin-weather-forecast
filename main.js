import { getWeatherData, processWeatherData } from './api.js';

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

/**
 * Sets up the weather form event listener to handle user input and fetch weather data.
 */
function setupForm() {
    const form = document.querySelector('#weatherForm');
    if (!form) {
        console.error("Weather form not found in the DOM.");
        return;
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission
        const locationInput = document.querySelector('#locationInput').value.trim();
        if (!locationInput) {
            console.log("Please enter a valid location.");
            return;
        }

        console.log("Form submitted successfully with location:", locationInput);
        // Additional actions like fetching weather data can be added here later
    });
}

// Test that setupForm correctly adds an event listener and handles form submissions.
document.addEventListener('DOMContentLoaded', () => {
    setupForm();
    console.log("setupForm initialized.");
});

// Test function to simulate the full workflow
async function testFullWorkflow(location) {
    console.log(`Testing full workflow for location: ${location}`);

    // Fetch raw weather data
    const rawData = await getWeatherData(location);
    if (!rawData) {
        console.log("Failed to fetch raw weather data.");
        return;
    }

    console.log("Raw weather data fetched:", rawData);

    // Process the fetched data
    const processedData = processWeatherData(rawData);
    if (!processedData) {
        console.log("Failed to process weather data.");
        return;
    }

    console.log("Processed weather data:", processedData);

    // Display the processed data
    displayWeather(processedData);
}

// Example test case
testFullWorkflow("London"); // Replace with any valid location for testing


/**
 * Logs the weather data to the console.
 * @param {Object|null} simplifiedWeather - The processed weather data.
 * @param {number} simplifiedWeather.temperature - The temperature in degrees Celsius.
 * @param {string} simplifiedWeather.weatherDescription - Weather description (e.g., "clear sky").
 * @param {number} simplifiedWeather.windSpeed - The wind speed in meters per second.
 */
function displayWeather(simplifiedWeather) {
    if (!simplifiedWeather) {
        console.log("No weather data to display.");
        return;
    }

    console.log("Displaying Weather Data:");
    console.log(`Temperature: ${simplifiedWeather.temperature}°C`);
    console.log(`Weather: ${simplifiedWeather.weatherDescription}`);
    console.log(`Wind Speed: ${simplifiedWeather.windSpeed} m/s`);
}

