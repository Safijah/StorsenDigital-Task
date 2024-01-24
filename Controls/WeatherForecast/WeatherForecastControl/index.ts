import React = require("react");
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { IWeatherData } from './interfaces/IWeatherForecast';
import { getWeatherData } from "./services/WeatherForecastService";
import { WeatherForecastComponent } from "./WeatherForecastComponent/WeatherForecastComponent";
import { createRoot } from 'react-dom/client';
import { IWeatherProps } from './interfaces/IWeatherProps';

export class WeatherForecastControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private _container: HTMLDivElement;
    private _weatherForecastData: IWeatherData[] = [];
    private _loading: boolean = true;

    constructor() {}

    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
        this._container = container;
        this.getWeatherForecastData();
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        // Add code to update control view
    }

    public getOutputs(): IOutputs {
        return {};
    }

    public destroy(): void {
        // Add code to cleanup control if necessary
    }

    private async getWeatherForecastData(): Promise<void> {
        try {
            this._weatherForecastData = await getWeatherData();
            this._loading = false;
            this.renderReactComponent();
        } catch (error) {
            this._loading = false;
            console.error("Error fetching weather data:", error);
            // Optionally, notify the user about the error
        }
    }

    private renderReactComponent(): void {
        const root = createRoot(this._container);

        if (!this._loading && this._weatherForecastData.length > 0) {
            root.render(React.createElement(WeatherForecastComponent, { data: this._weatherForecastData }));
        } else {
            // Optionally, show a loading indicator or an error message
            root.render(React.createElement("div", null, "Loading..."));
        }
    }
}
