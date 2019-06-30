import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BoxComponent } from './box/box.component';
import {AppsComponent} from "./box/apps/apps.component";
import {FilesComponent} from "./box/files/files.component";
import {HomeComponent} from "./box/home/home.component";
import {SettingsComponent} from "./box/settings/settings.component";
import { PasswordResetComponent } from './password-reset/password-reset.component';

const config: SocketIoConfig = { url: 'http://localhost:8080', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    BoxComponent,
    AppsComponent,
    FilesComponent,
    HomeComponent,
    SettingsComponent,
    PasswordResetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
