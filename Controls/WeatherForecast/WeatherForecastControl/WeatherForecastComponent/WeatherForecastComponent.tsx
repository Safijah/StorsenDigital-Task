import * as React from 'react';
import { IWeatherProps } from '../interfaces/IWeatherProps';
import { DocumentCard } from '@fluentui/react';
import { Image } from '@fluentui/react/lib/Image';
import { format, parseISO } from 'date-fns';
import './WeatherForecastComponent.css'
export class WeatherForecastComponent extends React.Component<IWeatherProps> {
    
    render() {
        return (
            <div >
                  <h2>The forecast for the next 5 days in Bugojno</h2>
                 
               <div className='weather-app-container'>
               {
                    this.props.data.map((item,index)=>(
                        <DocumentCard className='weather-forecast-grid' key={index}>
                            <h3 className='bold-text'>{format(parseISO(item.date), 'EEEE')} </h3>
                            <p>{item.date}</p>
                            <div className='icon-box'>                         
                            <Image src={item.icon} />
                            </div>
                        <h2 className='bold-text'>{~~item.temperature}&deg;C</h2>
                        <p>{item.description}</p>
                        </DocumentCard>
                    ))
                }
               </div>

            </div>
        );
    }

    
}