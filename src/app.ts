const searchBtn = document.querySelector('button') as HTMLButtonElement;
const mainContainer = document.getElementById('weather') as HTMLDivElement;
const searchContainer = document.getElementById('search') as HTMLDivElement;

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
// getWeatherData("London");

function getTemperature(data: WeatherInfo): void {
    console.log(data.current.feelslike_c + ' C', data.current.feelslike_f + ' F');
}

function getForecast(data: WeatherInfo): void {
    data.forecast.forecastday.forEach(dayF => {
        console.log(dayF);
    })
}

function loadingData(): void {
    mainContainer.classList.remove('grid', 'grid-cols-2', 'gap-3');
    mainContainer.innerHTML = `
    <div role="status" class="w-full animate-pulse">
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        <span class="sr-only">Loading...</span>
    </div>
    `;
}

function showWeatherData(): void{
    mainContainer.classList.remove("w-full","flex","justify-center");
    mainContainer.classList.add('grid', 'grid-cols-2', 'gap-3');
    searchContainer.classList.remove('justify-center');
    searchContainer.classList.add('justify-end');
    mainContainer.innerHTML = `
        <article class="col-span-1 p-5 shadow-lg rounded backdrop-blur-lg border border-[#1F1D1B] w-full h-full text-[#1F1D1B]">
            <h3>Today</h3>
            <h3>London</h3>
            <h2 class="text-4xl text-center">23°</h2>
            <h3>Rain</h3>
            <span>H: 24° L: 18°</span>
        </article>
        <div class="col-span-1 gap-3">
            <div class="grid grid-cols-2 gap-3 w-full h-full text-[#E0E2E4]">
                <article class="p-5 bg-[#1F1D1B] rounded shadow-md backdrop-blur-sm">
                    sunrise/sunset
                </article>
                <article class="p-5 bg-[#1F1D1B] rounded shadow-md backdrop-blur-sm">
                    wind
                </article>
                <article class="p-5 bg-[#1F1D1B] rounded shadow-md backdrop-blur-sm">
                    humidity
                </article>
                <article class="p-5 bg-[#1F1D1B] rounded shadow-md backdrop-blur-sm">
                    UV
                </article>
            </div>
        </div>
        <div class="col-span-2">
            <div class="grid grid-cols-3 gap-3">
                <article class="border border-[#1F1D1B] text-[#1F1D1B] p-5 rounded shadow-md backdrop-blur-sm w-full h-full">
                    Mon
                </article>
                <article class="bg-[#1F1D1B] text-[#E0E2E4] p-5 rounded shadow-md backdrop-blur-sm w-full h-full">
                    Tue
                </article>
                <article class="border border-[#1F1D1B] p-5 rounded shadow-md backdrop-blur-sm w-full h-full w-full h-full">
                    Wed
                </article>
            </div>
        </div>
    `;
}

searchBtn.addEventListener('click', () => {
    setTimeout(loadingData, 500);
    setTimeout(showWeatherData, 2000);
})