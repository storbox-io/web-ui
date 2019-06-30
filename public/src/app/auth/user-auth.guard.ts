import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from "../user.service";
import {AuthService} from "../auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {

  constructor(public sio: AuthService, public user: UserService, public router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve => {
      this.sio.autoLogin(() => {
        this.user.getUserInfo(() => {
          if (this.user.isLoggedIn()) {
            resolve(true);
            return;
          }

          this.user.redirectUrl = state.url;

          this.router.navigate(['/login']);
          resolve(false);
        });
      }, () => {
        this.router.navigate(['/login']);
        resolve(false);
      });
    }));

  }

}
