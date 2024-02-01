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
const baseUrl = 'https://api.weatherapi.com/v1';
const key = 'c26069194a4e4f73bac22525240501';
function getWeatherData(city) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const url = `${baseUrl}/forecast.json?key=${key}&q=${city}&days=3`;
            const response = yield fetch(url);
            const data = yield response.json();
            if (response.status === 200) {
                console.log(data);
                getTemperature(data);
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
getWeatherData("London");
function getTemperature(data) {
    console.log(data.current.feelslike_c + ' C', data.current.feelslike_f + ' F');
}
function getForecast(data) {
    console.log(data.forecastDays);
}
