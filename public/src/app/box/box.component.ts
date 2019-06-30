import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.less']
})
export class BoxComponent implements OnInit {

  constructor(public user: UserService) { }

  ngOnInit() {
  }

}
