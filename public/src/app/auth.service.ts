import { Injectable } from '@angular/core';
import {SocketIOService} from "./socket-io.service";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn = false;

  constructor(private sio: SocketIOService, public cookie: CookieService) { }

  autoLogin(success, fail = null) {
    if (this.loggedIn) {
      success();
      return;
    }

    if (this.cookie.get("token") !== undefined) {
      this.loginWithToken(this.cookie.get("token"), msg => {
        if (msg.success) {
          this.loggedIn = true;
          success();
        } else {
          this.loggedIn = false;
          if(fail !== null) fail();
        }
      });
    } else {
      if(fail !== null) fail();
    }
  }

  login(username, password, cb) {
    this.sio.transceiveMessage("login", {username, password}, msg => {
      if(msg.success) {
        this.loggedIn = true;
      }
      cb(msg);
    });
  }

  loginWithToken(token, cb) {
    this.sio.transceiveMessage("login-token", {token}, msg => {
      if(msg.success) {
        this.loggedIn = true;
      } else {
        this.cookie.delete("token", "/");
      }
      cb(msg);
    });
  }

  logout(cb) {
    this.sio.transceiveMessage("logout", null, msg => {
      this.loggedIn = false;
      cb(msg);
    });
  }

  isLoggedIn() {
    return this.loggedIn;
  }

}
