import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {BoxComponent} from "./box/box.component";
import {HomeComponent} from "./box/home/home.component";
import {FilesComponent} from "./box/files/files.component";
import {AppsComponent} from "./box/apps/apps.component";
import {SettingsComponent} from "./box/settings/settings.component";
import {PasswordResetComponent} from "./password-reset/password-reset.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'password-reset', component: PasswordResetComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'box', component: BoxComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeComponent },
      { path: 'files', component: FilesComponent },
      { path: 'apps', component: AppsComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
