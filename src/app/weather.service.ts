import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) { }

  getWeatherForCity(city: string): Observable<any> {
    const options = {
      params: new HttpParams()
        .set('q', city)
        .set('units', 'metric')
        .set('APPID', environment.apiKey)
    };
    return this.http.get<any>(environment.apiUrl, options).pipe(
      map(data => ({
        ...data,
        image: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      }))
    );
  }
}
