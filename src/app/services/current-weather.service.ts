import { Injectable, isDevMode } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../environments/environment'
import { Coords } from '../structures/cords.structure';
import {map} from 'rxjs/operators';
import { Weather } from '../structures/wheater.structure';
@Injectable({
  providedIn: 'root'
})
export class CurrentWeatherService {

  public weatherSubject: Subject<any> = new Subject<any>();
  public weather$: Observable<any>;

  endPoint : string = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(
    private httpClient: HttpClient
  ) { 

    this.weather$ = this.weatherSubject.pipe(
      map((data: any)=>{
        let mainWeather = data.weather[0];
        let weather : Weather = {
          name: data.name,
          cod: data.cod,
          temp: data.main.temp,
          ...mainWeather
        };
        return weather;
      }
    ));

    this.get({
      lat : 35, long: 139
    });
  }


  get(coords : Coords) {
    let args : string = `?lat=${coords.lat}&lon=${coords.long}&APPID=${environment.key}&units=metrics`;
    let url : string = this.endPoint+args;
    if (isDevMode()){
      url = 'assets/weather.json';
    };
    this.httpClient.get(url).subscribe(this.weatherSubject);
  }
}
