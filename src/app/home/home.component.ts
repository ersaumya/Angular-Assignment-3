import { CommonService } from './../shared/service/common.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { IAppConfig } from '../shared/utility/IAppConfig';
import { APP_CONFIG } from '../shared/utility/AppConfig';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  cities: String[] = ['Delhi', 'Kolkata', 'Odisha', 'Bangalore'];
  sub: Subscription = new Subscription();
  citiesStore = Array();

  constructor(
    private commonService: CommonService,
    @Inject(APP_CONFIG) private appConfig: IAppConfig
  ) {}

  ngOnInit() {
    this.getCityWeather();
  }

  getCityWeather() {
    this.cities.forEach((data) => {
      this.commonService
        .getAllCityWeather({ q: data, appid: this.appConfig.apiKey })
        .subscribe((data) => {
          this.citiesStore.push({
            city: data['name'],
            temperature: (data['main'].temp - 273.15).toFixed(0),
            sunrise: new Date(data['sys'].sunrise).toLocaleTimeString(),
            sunset:new Date(data['sys'].sunset).toLocaleTimeString(),
            date:new Date(data['dt']).toDateString()
          });
        });
    });
  }
}
