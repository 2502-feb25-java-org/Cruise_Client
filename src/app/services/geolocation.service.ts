import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Coordinates} from '../models/coordinates';

const GEOLOCATION_ERRORS = [
    'Browser does not support location services',
    'You have rejected access to your location',
    'Unable to determine your location',
    'Service timeout has been reached'
];

@Injectable()
export class GeolocationService {

    public getLocation(): Observable<Coordinates> {
        console.log("2");
        return Observable.create(observer => {
            console.log("3");
            if (window.navigator && window.navigator.geolocation) {
                console.log("4");
                window.navigator.geolocation.getCurrentPosition(
                    (position) => {
                        console.log("5");
                        observer.next(new Coordinates({
                            latitude: position.coords.latitude.toString(),
                            longitude: position.coords.longitude.toString(),
                            accuracy: position.coords.accuracy
                        }));
                        observer.complete();
                    },
                    (error) => observer.error(GEOLOCATION_ERRORS[+error.code]));
            } else {
                observer.error(GEOLOCATION_ERRORS[0]);
            }
        });


    }

}