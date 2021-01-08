import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavBarComponent } from './shared/component/nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { CityComponent } from './city/city.component';
import { IAppConfig } from './shared/utility/IAppConfig';
import { environment } from 'src/environments/environment';
import { APP_CONFIG } from './shared/utility/AppConfig';
import { HttpClientModule } from '@angular/common/http';


const AppConfig: IAppConfig = {
  apiEndPoint: environment.apiEndPoint,
  apiKey: environment.apiKey,
};

@NgModule({
  declarations: [AppComponent, NavBarComponent, HomeComponent, CityComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatCardModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [{ provide: APP_CONFIG, useValue: AppConfig }],
  bootstrap: [AppComponent],
})
export class AppModule {}
