export default interface WeatherInfo {
    location: {
        name: string,
        country: string
    },
    current: {
        temp_c: number,
        humidity: number,
        wind_kph: number,
        precip_mm: number,
        cloud: number,
        uv: number,
        condition: {
            text: string
        }
    },
    forecast: {
        forecastday: [
            {
                date: string,
                astro: {
                    sunrise: string,
                    sunset: string
                },
                day: {
                    date: string,
                    avgtemp_c: number,
                    maxtemp_c: number,
                    mintemp_c: number,
                    maxwind_kph: number,
                    daily_chance_of_rain: number,
                    condition: {
                        text: string
                    }
                }
            }
        ]
    }
}