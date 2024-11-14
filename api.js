// Fetch weather data for a given location using async/await
export async function getWeatherData(location) {
    const apiKey = '016f435b9b884308e666856c79dac74c';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        console.log("Raw data:", data);  // Log raw data to the console for verification
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
}


