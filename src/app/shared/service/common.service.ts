import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAppConfig } from '../utility/IAppConfig';
import { APP_CONFIG } from '../utility/AppConfig';
import { Observable, throwError } from 'rxjs';
import { tap,catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(
    private httpClient: HttpClient,
    @Inject(APP_CONFIG) private appConfig: IAppConfig
  ) {}

  getAllCityWeather(paramData: any) {
    return this.httpClient
      .get(this.appConfig.apiEndPoint + '/weather', {
        params: paramData,
      })
      .pipe(
        tap((data: any) => console.log('Weather:', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getDetailsTemperature(paramData: any): Observable<any> {
    return this.httpClient.get<any>(this.appConfig.apiEndPoint + '/forecast', {
      params: paramData,
    });
  }

  private handleError(err:any) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      // server-side error
      errorMessage = `Backend error code: ${err.status}\nMessage: ${err.message}`;
    }
    console.error(err);
    //window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
