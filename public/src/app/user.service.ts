import {EventEmitter, Injectable} from '@angular/core';
import {SocketIOService} from "./socket-io.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: any = {username: "Not logged in"};
  public loggedIn: boolean = false;

  public redirectUrl: string = "";

  constructor(public sio: SocketIOService, public auth: AuthService, public cookie: CookieService, public router: Router) {
    this.getUserInfo();
  }

  getUserInfo(cb = null) {
    this.auth.autoLogin(() => {
      console.log("Send message");
      this.sio.transceiveMessage("user-info", null, msg => {
        console.log(msg);
        if (msg.success === true) {
          this.user = msg.user;
          this.loggedIn = true;
        } else {
          this.loggedIn = false;
        }
        if (cb !== null) cb();
      });
    });
  }

  getUser() {
    return this.user || {username: "Not logged in"};
  }

  logout() {
    this.auth.logout(msg => {
      this.cookie.delete("token");
      this.loggedIn = false;
      this.user = {username: "Not logged in"};
      this.router.navigate(["/login"]);
    });
  }

  isLoggedIn() {
    return this.user !== undefined && this.user.ingameName !== "Not logged in";
  }

  isAdmin() {
    return this.user !== undefined && this.user.admin !== undefined && this.user.admin;
  }

}
