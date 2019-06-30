import { Component } from '@angular/core';
import {SocketIOService} from "./socket-io.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  constructor(private sio: SocketIOService) {}

}
