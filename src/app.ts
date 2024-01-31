interface WeatherTemperature {
    current: {
        feelslike_c: number,
        feelslike_f: number
    }
}

const baseUrl = 'https://api.weatherapi.com/v1';
const key = 'c26069194a4e4f73bac22525240501';

async function getCurrent(city: string): Promise<void> {
    try {
        const url = `${baseUrl}/current.json?key=${key}&q=${city}`;
        const response = await fetch(url);
        const data = await response.json();
        if(response){
            console.log(data);
            getTemperature(data);
        }else{
            console.log('Server Error',data.error.message);
        }
    } catch (error) {
        // Fetch request couldn't be completed
        console.log('Fetch Error:',error);
    }
}
getCurrent("London");

function getTemperature(data: WeatherTemperature): void {
    console.log(data.current.feelslike_c + ' C', data.current.feelslike_f + ' F');
}