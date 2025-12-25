import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment'

@Component({
  selector: 'app-fetch-data',
  standalone: false,
  templateUrl: './fetch-data.component.html',
  styleUrl: './fetch-data.component.css'
})
export class FetchDataComponent {

  public forecasts: WeatherForecast[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getForecasts();
  }

  getForecasts() {
    console.log(environment.baseUrl +'api/weatherforecast')
    this.http.get<WeatherForecast[]>(environment.baseUrl + 'api/weatherforecast').subscribe(
      (result) => {
        this.forecasts = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  title = 'healthcheck.client';
}
interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
