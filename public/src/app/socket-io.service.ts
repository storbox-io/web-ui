import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketIOService {

  constructor(private socket: Socket) { }

  sendMessage(channel, msg) {
    this.socket.emit(channel, msg);
  }

  transceiveMessage(channel, msg, cb) {
    this.socket.once(channel, cb);
    this.socket.emit(channel, msg);
  }

}
