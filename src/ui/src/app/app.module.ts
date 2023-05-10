import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { TranslateComponent } from './modules/translate/translate.component';
import { NavbarComponent } from './modules/shared/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './modules/login/login.component';
import { DownloadService } from './modules/service/download.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TranslateComponent,
    NavbarComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
