import { getWeatherData, processWeatherData } from './api.js';

// Test the API function by calling it directly with a sample location
async function testWeatherData() {
    const rawData = await getWeatherData("London");  // Fetch raw data for "London"
    const processedData = processWeatherData(rawData);  // Process the raw data

    // Console log the processed data to verify
    console.log("Final processed data:", processedData);  // This should show simplified weather info
}

testWeatherData();
