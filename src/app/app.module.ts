import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ReportsComponent } from './components/reports/reports.component';
import { UsersComponent } from './components/users/users.component';
import { PublicationsComponent } from './components/publications/publications.component';

import { AngularFireModule} from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './components/menu/menu.component';
import { SuperadminComponent } from './components/superadmin/superadmin.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { YouTubePlayerModule  }  from  '@angular/youtube-player';
import { ServiceWorkerModule } from '@angular/service-worker';
import {MaterialModule} from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyAlertDialogComponent } from '../app/my-alert-dialog/my-alert-dialog.component';
@NgModule({
  entryComponents: [
    MyAlertDialogComponent
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ReportsComponent,
    UsersComponent,
    PublicationsComponent,
    LoginComponent,
    MenuComponent,
    SuperadminComponent,
    MyAlertDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    IvyCarouselModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.credencialesFirebase),
    YouTubePlayerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
