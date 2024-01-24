import axios from 'axios';
import { IWeatherData } from '../interfaces/IWeatherForecast';
import { key, city ,days} from '../configuration/WeatherForecastConfig';

export const getWeatherData = async (): Promise<IWeatherData[]> => {
  try {
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=${days}&aqi=no&alerts=no`;
    const response = await axios.get(apiUrl);
    console.log(response);
    const forecastData:IWeatherData[] = response.data.forecast.forecastday.map((item: any) => ({
      date: item.date,
      temperature: item.day.avgtemp_c,
      description: item.day.condition.text,
      icon: item.day.condition.icon,
    }));
    
    return forecastData;
  } catch (error) {
    console.error('Error fetching weather forecast data:', error);
    throw new Error('Failed to fetch weather forecast data');
  }
};



