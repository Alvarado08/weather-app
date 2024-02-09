"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const searchBtn = document.querySelector('button');
const inputEl = document.querySelector('input');
const errorMsj = document.getElementById('error');
const mainContainer = document.getElementById('weather');
const searchContainer = document.getElementById('search');
const baseUrl = 'https://api.weatherapi.com/v1';
const key = 'c26069194a4e4f73bac22525240501';
// Console testing
// async function getWeatherData(city: string): Promise<void> {
//     try {
//         const url = `${baseUrl}/forecast.json?key=${key}&q=${city}&days=3`;
//         const response = await fetch(url);
//         const data = await response.json();
//         if(response.status === 200){
//             console.log(data);
//             // getTemperature(data);
//             getForecast(data);
//         }else{
//             console.log('Server Error',data.error.message);
//         }
//     } catch (error) {
//         // Fetch request couldn't be completed
//         console.log('Fetch Error:',error);
//     }
// }
//getWeatherData("London");
function getWeatherData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let city = inputEl.value.trim();
            const url = `${baseUrl}/forecast.json?key=${key}&q=${city}&days=3`;
            const response = yield fetch(url);
            const data = yield response.json();
            if (response.status === 200) {
                console.log(data);
                showWeatherData(data);
                // getTemperature(data);
                // getForecast(data);
            }
            else {
                console.log('Server Error', data.error.message);
            }
        }
        catch (error) {
            // Fetch request couldn't be completed
            console.log('Fetch Error:', error);
        }
    });
}
function getForecast(data) {
    data.forecast.forecastday.forEach(dayF => {
        console.log(dayF);
    });
}
function loadingData() {
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
function showWeatherData(data) {
    mainContainer.classList.remove("w-full", "flex", "justify-center");
    mainContainer.classList.add('grid', 'grid-cols-2', 'gap-3');
    searchContainer.classList.remove('justify-center');
    searchContainer.classList.add('justify-end');
    mainContainer.innerHTML = `
        <article class="col-span-1 p-5 shadow-lg rounded backdrop-blur-lg border border-[#1F1D1B] w-full h-full text-[#1F1D1B] flex flex-col justify-between">
            <div>
                <h3 class="text-xl font-semibold">Today</h3>
                <h3 class="text-lg">${data.location.name}, ${data.location.country}</h3>
            </div>
            <h2 class="text-xl sm:text-2xl md:text-4xl text-center">${data.current.temp_c}°</h2>
            <div class="gap-3">
                <h3>${data.current.condition.text}</h3>
                <div class="inline-flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-ripple" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7c3 -2 6 -2 9 0s6 2 9 0" /><path d="M3 17c3 -2 6 -2 9 0s6 2 9 0" /><path d="M3 12c3 -2 6 -2 9 0s6 2 9 0" />
                    </svg>
                    <span>${data.current.humidity}</span>
                </div>
            </div>
        </article>
        <div class="col-span-1 gap-3">
            <div class="grid grid-cols-2 gap-3 w-full h-full text-[#E0E2E4]">
                <article class="p-5 bg-[#1F1D1B] rounded shadow-md backdrop-blur-sm flex flex-col justify-between gap-2">
                    <div class="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" 
                        class="icon icon-tabler icon-tabler-sunset" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 17h1m16 0h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7m-9.7 5.7a4 4 0 0 1 8 0" /><path d="M3 21l18 0" />
                        <path d="M12 9v-6l3 3m-6 0l3 -3" />
                        </svg>
                        <span class="text-sm">6:00AM</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-sunset" width="30" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 17h1m16 0h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7m-9.7 5.7a4 4 0 0 1 8 0" /><path d="M3 21l18 0" /><path d="M12 3v6l3 -3m-6 0l3 3" />
                        </svg>
                        <span class="text-sm">8:00PM</span>
                    </div>
                </article>
                <article class="p-5 bg-[#1F1D1B] rounded shadow-md backdrop-blur-sm flex flex-col items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-wind" width="30" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 8h8.5a2.5 2.5 0 1 0 -2.34 -3.24" /><path d="M3 12h15.5a2.5 2.5 0 1 1 -2.34 3.24" /><path d="M4 16h5.5a2.5 2.5 0 1 1 -2.34 3.24" />
                    </svg>
                    <span class="text-sm">15 km/h</span>
                </article>
                <article class="p-5 bg-[#1F1D1B] rounded shadow-md backdrop-blur-sm flex flex-col items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-cloud-rain" width="30" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7" /><path d="M11 13v2m0 3v2m4 -5v2m0 3v2" />
                    </svg>
                    <span class="text-sm">10%</span>
                </article>
                <article class="p-5 bg-[#1F1D1B] rounded shadow-md backdrop-blur-sm flex flex-col justify-between items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-uv-index" width="30" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12h1m16 0h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7m-9.7 5.7a4 4 0 1 1 8 0" /><path d="M12 4v-1" /><path d="M13 16l2 5h1l2 -5" /><path d="M6 16v3a2 2 0 1 0 4 0v-3" />
                    </svg>
                    <span class="text-sm">5</span>
                </article>
            </div>
        </div>
        <div class="col-span-2">
            <div class="grid grid-cols-3 gap-3">
                <article class="border border-[#1F1D1B] text-[#1F1D1B] p-5 rounded shadow-md backdrop-blur-sm w-full h-full flex flex-col justify-between gap-2">
                    <h2 class="font-bold">Mon</h2>
                    <div class="flex justify-between items-center">
                        <div class="flex flex-col items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-cloud-rain" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7" /><path d="M11 13v2m0 3v2m4 -5v2m0 3v2" />
                            </svg>
                            <span class="text-sm">10%</span>
                        </div>
                        <div class="flex flex-col items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-wind" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 8h8.5a2.5 2.5 0 1 0 -2.34 -3.24" /><path d="M3 12h15.5a2.5 2.5 0 1 1 -2.34 3.24" /><path d="M4 16h5.5a2.5 2.5 0 1 1 -2.34 3.24" />
                            </svg>
                            <span class="text-sm">15 km/h</span>
                        </div>
                    </div>
                    <h2 class="text-4xl text-center">26°</h2>
                    <div>
                        <h3>Sunny</h3>
                        <span>H: 24° L: 18°</span>
                    </div>
                </article>
                <article class="bg-[#1F1D1B] text-[#E0E2E4] p-5 rounded shadow-md backdrop-blur-sm w-full h-full flex flex-col justify-between gap-2">
                    <h2 class="font-bold">Tue</h2>
                    <div class="flex justify-between items-center">
                        <div class="flex flex-col items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-cloud-rain" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7" /><path d="M11 13v2m0 3v2m4 -5v2m0 3v2" />
                            </svg>
                            <span class="text-sm">5%</span>
                        </div>
                        <div class="flex flex-col items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-wind" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 8h8.5a2.5 2.5 0 1 0 -2.34 -3.24" /><path d="M3 12h15.5a2.5 2.5 0 1 1 -2.34 3.24" /><path d="M4 16h5.5a2.5 2.5 0 1 1 -2.34 3.24" />
                            </svg>
                            <span class="text-sm">7 km/h</span>
                        </div>
                    </div>
                    <h2 class="text-4xl text-center">21°</h2>
                    <div>
                        <h3>Cloudy</h3>
                        <span>H: 22° L: 17°</span>
                    </div>
                </article>
                <article class="border border-[#1F1D1B] text-[#1F1D1B] p-5 rounded shadow-md backdrop-blur-sm w-full h-full flex flex-col justify-between gap-2">
                    <h2 class="font-bold">Wed</h2>
                    <div class="flex justify-between items-center">
                        <div class="flex flex-col items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-cloud-rain" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7" /><path d="M11 13v2m0 3v2m4 -5v2m0 3v2" />
                            </svg>
                            <span class="text-sm">30%</span>
                        </div>
                        <div class="flex flex-col items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-wind" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 8h8.5a2.5 2.5 0 1 0 -2.34 -3.24" /><path d="M3 12h15.5a2.5 2.5 0 1 1 -2.34 3.24" /><path d="M4 16h5.5a2.5 2.5 0 1 1 -2.34 3.24" />
                            </svg>
                            <span class="text-sm">10 km/h</span>
                        </div>
                    </div>
                    <h2 class="text-4xl text-center">15°</h2>
                    <div>
                        <h3>Rainy</h3>
                        <span>H: 20° L: 10°</span>
                    </div>
                </article>
            </div>
        </div>
    `;
}
searchBtn.addEventListener('click', () => {
    if (inputEl.value.trim() === '') {
        inputEl.classList.add('border-red-500', 'text-red-500');
        inputEl.value = 'Please enter a valid city name!';
        // errorMsj.textContent = 'Please enter a valid city name!';
        setTimeout(() => {
            // errorMsj.textContent = '';
            inputEl.classList.remove('border-red-500', 'text-red-500');
            inputEl.value = '';
        }, 3000);
    }
    else {
        loadingData();
        setTimeout(() => {
            getWeatherData();
        }, 2000);
    }
});
