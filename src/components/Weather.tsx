// Make sure forecast is properly typed and initialized
interface ForecastDay {
  date: string;
  // Add other properties that your forecast day contains
  temperature: number;
  // ... other properties
}

// Update the ForecastData interface to match your API response
interface ForecastData {
  date: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;  // Added this since it's in your API response
}

// Inside your component, add a check to ensure forecast is an array
const WeatherForecast = ({ forecast }: { forecast: ForecastDay[] }) => {
  // Add a guard clause to handle when forecast is undefined or not an array
  if (!forecast || !Array.isArray(forecast)) {
    return <div>No forecast data available</div>;
  }

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">7-Day Forecast</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {forecast.map((day, index) => (
          <div key={index} className="p-4 bg-white dark:bg-gray-700 rounded-lg text-center">
            <p className="text-sm font-semibold mb-2">
              {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
            </p>
            {/* ... rest of your forecast day display ... */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Weather() {
  // ... existing code ...

  // Add a check before rendering the forecast section
  const renderForecast = () => {
    if (!forecast || !Array.isArray(forecast) || forecast.length === 0) {
      return <div className="text-center p-4">No forecast data available</div>;
    }

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {forecast.map((day, index) => (
          <div key={index} className="p-4 bg-white dark:bg-gray-700 rounded-lg text-center">
            <p className="text-sm font-semibold mb-2">
              {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
            </p>
            <div className="text-3xl mb-2">{getWeatherIcon(day.description)}</div>
            <p className="text-lg font-bold">{Math.round(day.temperature)}°C</p>
            <p className="text-sm capitalize">{day.description}</p>
            <p className="text-sm">
              <span className="mr-1">💧</span>{day.humidity}%
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Suspense>
      <div className="max-w-4xl mx-auto bg-sky-100 dark:bg-gray-800 rounded-lg shadow-lg p-6 text-gray-900 dark:text-white">
        {/* ... existing code ... */}

        {/* Replace the forecast section with the new renderForecast function */}
        {weather && (
          <div className="space-y-8">
            {/* ... existing weather display ... */}

            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">7-Day Forecast</h3>
              {renderForecast()}
            </div>
          </div>
        )}
      </div>
    </Suspense>
  );
} 