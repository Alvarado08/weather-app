export default interface WeatherInfo {
    location: {
        name: string,
        country: string
    },
    current: {
        temp_c: number,
        humidity: number,
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
                    maxtemp_c: number,
                    maxtemp_f: number,
                    mintemp_c: number,
                    mintemp_f: number,
                    maxwind_mph: number,
                    maxwind_kph: number,
                    daily_chance_of_rain: number,
                    uv: number
                    condition: {
                        icon: string,
                        text: string
                    }
                }
            }
        ]
    }
}