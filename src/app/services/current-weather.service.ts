import { Injectable, isDevMode } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../environments/environment'
import { Coords } from '../structures/cords.structure';
import {map} from 'rxjs/operators';
import { Weather } from '../structures/wheater.structure';
import { GeolocationService } from './geolocation.service';
@Injectable({
  providedIn: 'root'
})
export class CurrentWeatherService {

  public weatherSubject: Subject<any> = new Subject<any>();
  public weather$: Observable<any>;

  endPoint : string = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(
    private httpClient: HttpClient,
    private geoService: GeolocationService
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

    this.geoService.coords$.subscribe((coords)=>{
      this.get(coords);
    });
  }


  get(coords : Coords) {
    let args : string = `?lat=${coords.lat}&lon=${coords.long}&APPID=${environment.key}&units=metrics`;
    let url : string = this.endPoint+args;
    
    this.httpClient.get(url).subscribe(this.weatherSubject);
  }
}
