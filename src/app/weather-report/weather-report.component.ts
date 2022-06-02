import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, concatMap, filter, map, Observable, tap } from 'rxjs';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-report',
  templateUrl: './weather-report.component.html',
  styleUrls: ['./weather-report.component.css']
})
export class WeatherReportComponent implements OnInit {

  data$!: Observable<any>;

  today: Date = new Date();

  loading = false;
  wrongCityError = false;
  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute, 
    private router: Router
  ) { }

  ngOnInit() {}

  getWeaterData() {
    this.wrongCityError = false
    this.data$ = this.route.params.pipe(
      map(params => params['locationName']),
      filter(name => !!name),
      tap(() => {
        this.loading = true;
      }),
      concatMap(name => this.weatherService.getWeatherForCity(name)),
      tap(() => {
        this.loading = false;
      }),
      catchError(err => {
        this.wrongCityError = true;
        throw 'error in Api. Details: ' + err;
      })
    );
  }

  navigateToWeater(city: string){
    this.router.navigate([city]);
    this.getWeaterData();
  }
}
