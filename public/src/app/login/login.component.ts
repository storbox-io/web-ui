import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {UserService} from "../user.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';

  error = false;

  constructor(public auth: AuthService, public user: UserService, public router: Router, public cookie: CookieService) { }

  ngOnInit() {
    this.auth.autoLogin(() => {
      this.router.navigate(["/box"]);
    });
  }

  login() {
    this.auth.login(this.username, this.password, msg => {
      console.log(msg);
      if(msg.success) {
        this.user.getUserInfo(() => {
          let url = "/box";
          console.log("Info");

          if(this.user.redirectUrl !== "") {
            url = this.user.redirectUrl;
            this.user.redirectUrl = "";
          }

          this.router.navigate([url]);
          console.log("navigate");
          this.cookie.set("token", msg.token, null, "/");
        }, false);
      } else {
        this.error = true;
        this.password = '';
      }
    });
  }

}
