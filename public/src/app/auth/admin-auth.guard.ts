import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from "../user.service";
import {AuthService} from "../auth.service";

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(public auth: AuthService, public user: UserService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve => {
      this.auth.autoLogin(() => {
        this.user.getUserInfo(() => {
          resolve(this.user.isAdmin());
        });
      }, () => {
        resolve(false);
      });
    }));
  }
}
