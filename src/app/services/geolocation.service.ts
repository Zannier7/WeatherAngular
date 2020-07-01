import { Injectable } from '@angular/core';
import { Coords } from '../structures/cords.structure';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  public coords$: Promise<Coords>;

  constructor() { }

  requestGeolocation() {
    this.coords$ = this.getGeolocation();
  }

  getGeolocation(): Promise<Coords>{
    return new Promise((res, rej)=>{
      if(!navigator || !('geolocation' in navigator)) {
        return rej('Geolocation is not available');
      }

      (navigator as any).geolocation.getCurrentPosition((position)=>{
        res({
          lat: position.coords.latitude,
          long: position.coords.longitude
        });
      });
    });
  }

}
