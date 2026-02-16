interface MarsWeatherProps {
  weather: {
    atmo_opacity: string;
    season: string;
    terrestrial_date: string;
    sol: number;
    min_temp: number;
    max_temp: number;
    pressure: number;
    unit_pressure: string;
    wind_speed: number;
    unit_wind_speed: string;
  };
}

const MarsWeather = ({ weather }: MarsWeatherProps) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <h3 className="mb-4 text-lg font-semibold text-white flex items-center gap-2">
        <span className="text-2xl">🌡️</span>
        Mars Weather - Sol {weather.sol}
      </h3>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2">
          <p className="text-sm font-medium text-white/80">Temperature</p>
          <p className="text-2xl font-mono text-white">
            {weather.min_temp}° → {weather.max_temp}°C
          </p>
          <p className="text-xs text-white/60">Min → Max</p>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium text-white/80">Atmospheric Pressure</p>
          <p className="text-2xl font-mono text-white">
            {weather.pressure} {weather.unit_pressure}
          </p>
          <p className="text-xs text-white/60">Surface pressure</p>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium text-white/80">Wind Speed</p>
          <p className="text-2xl font-mono text-white">
            {weather.wind_speed} {weather.unit_wind_speed}
          </p>
          <p className="text-xs text-white/60">Average velocity</p>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium text-white/80">Atmosphere</p>
          <p className="text-xl font-mono text-white capitalize">
            {weather.atmo_opacity.toLowerCase()}
          </p>
          <p className="text-xs text-white/60">Visibility conditions</p>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium text-white/80">Season</p>
          <p className="text-xl font-mono text-white capitalize">
            {weather.season}
          </p>
          <p className="text-xs text-white/60">Martian year</p>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium text-white/80">Earth Date</p>
          <p className="text-xl font-mono text-white">
            {weather.terrestrial_date}
          </p>
          <p className="text-xs text-white/60">Corresponding date</p>
        </div>
      </div>
      
      <div className="mt-4 rounded-lg border border-amber-400/30 bg-amber-400/5 p-3">
        <p className="text-sm text-amber-200">
          <span className="font-semibold">Mission Context:</span> Current conditions show 
          {weather.atmo_opacity === 'Sunny' ? ' clear visibility for photography' : ' challenging atmospheric conditions'} 
          with {weather.max_temp > -20 ? 'relatively warm' : 'extremely cold'} temperatures affecting rover operations.
        </p>
      </div>
    </div>
  );
};

export default MarsWeather;
