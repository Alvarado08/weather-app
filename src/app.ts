// add forecast and pending props to WeatherTemperature
// create getForecast function
// change getCurrent to getData
// change getTemperature to getCurrent
interface WeatherInfo {
    current: {
        feelslike_c: number,
        feelslike_f: number
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
                    avghumidity: number,
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

const baseUrl = 'https://api.weatherapi.com/v1';
const key = 'c26069194a4e4f73bac22525240501';

async function getWeatherData(city: string): Promise<void> {
    try {
        const url = `${baseUrl}/forecast.json?key=${key}&q=${city}&days=3`;
        const response = await fetch(url);
        const data = await response.json();
        if(response.status === 200){
            console.log(data);
            getTemperature(data);
            getForecast(data);
        }else{
            console.log('Server Error',data.error.message);
        }
    } catch (error) {
        // Fetch request couldn't be completed
        console.log('Fetch Error:',error);
    }
}
getWeatherData("London");

function getTemperature(data: WeatherInfo): void {
    console.log(data.current.feelslike_c + ' C', data.current.feelslike_f + ' F');
}

function getForecast(data: WeatherInfo): void {
    data.forecast.forecastday.forEach(dayF => {
        console.log(dayF);
    })
}