import { Injectable } from '@angular/core';
import { Navigation } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GpsService {
  constructor() {}

  posicionActual = new Observable<PosicionDeGeolocalizacion>((observer) => {
    let watchId: number;
    console.log(watchId);

    if (this.soportado()) {
      watchId = navigator.geolocation.watchPosition(
        (position: GeolocationPosition) => {
          observer.next(this.convertirAObjeto(position));
        },
        (error: GeolocationPositionError) => {
          observer.error(error);
        }
      );
    } else observer.error('Navegador no soportado');

    // When the consumer unsubscribes, clean up data ready for next subscription.
    return {
      unsubscribe() {
        navigator.geolocation.clearWatch(watchId);
      },
    };
  });

  ubicacionActual() {
    return new Promise<PosicionDeGeolocalizacion>((resolve, reject) => {
      if (!this.soportado()) return reject('Navegador no soportado');

      navigator.geolocation.getCurrentPosition(
        (position) => resolve(this.convertirAObjeto(position)),
        (error) => reject(error)
      );
    });
  }

  private soportado() {
    return 'geolocation' in navigator;
  }

  private convertirAObjeto(
    geo: GeolocationPosition
  ): PosicionDeGeolocalizacion {
    let nuevo: PosicionDeGeolocalizacion = {
      coords: {
        accuracy: geo.coords.accuracy,
        altitude: geo.coords.altitude,
        altitudeAccuracy: geo.coords.altitudeAccuracy,
        heading: geo.coords.heading,
        latitude: geo.coords.latitude,
        longitude: geo.coords.longitude,
        speed: geo.coords.speed,
      },
      timestamp: geo.timestamp,
    };

    return nuevo;
  }
}

export interface PosicionDeGeolocalizacion {
  coords: {
    accuracy: number;
    altitude: number;
    altitudeAccuracy: number;
    heading: number;
    latitude: number;
    longitude: number;
    speed: number;
  };
  timestamp: number;
}
