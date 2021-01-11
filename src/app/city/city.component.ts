import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonService } from '../shared/service/common.service';
import { APP_CONFIG } from '../shared/utility/AppConfig';
import { IAppConfig } from '../shared/utility/IAppConfig';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
})
export class CityComponent implements OnInit,OnDestroy {
  
  cityName: string;
  temperatureStore = [];
  sub: Subscription | any;

  constructor(
    private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(APP_CONFIG) private appConfig: IAppConfig
  ) {
    this.cityName = this.route.snapshot.paramMap.get('city');
  }

  ngOnInit(): void {
    this.getCityValue();
  }

  getCityValue() {
    this.sub=this.commonService
      .getDetailsTemperature({ q: this.cityName, appid: this.appConfig.apiKey })
      .subscribe((data: []) => {
        if (data?.['list'].length > 0) {
          data['list'].map((res) => {
            console.log(new Date(res['dt_txt']).toLocaleTimeString().trim());
            if (
              new Date(res['dt_txt']).toLocaleTimeString().trim() ==
              '9:00:00 AM'
            ) {
              this.temperatureStore.push({
                temp: (res['main']['temp'] / 10).toFixed(0),
                date: new Date(res['dt'] * 1000).toDateString(),
              });
            }
          });
        }
      });
  }

  navigateBack() {
    this.router.navigate(['home']);
  }

  ngOnDestroy(){
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
