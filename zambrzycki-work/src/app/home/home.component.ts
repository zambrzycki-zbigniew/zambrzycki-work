import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('hidden', [
      state('true', style({color: "#000000"})),
      state('false', style({color: "#FFFFFF"})),
      transition('0 <=> 1', animate('3000ms ease'))
    ]),
    trigger('hidden2', [
      state('true', style({color: "#000000"})),
      state('false', style({color: "#FFFFFF"})),
      transition('0 <=> 1', animate('3000ms ease'))
    ])
  ]
})
export class HomeComponent implements OnInit {
  hidden:boolean = true;
  hidden2:boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  typingFinished() {
    this.hidden=false;
  }

  animEnd(event: any) {
    console.log("hidden2 triggered")
    this.hidden2=this.hidden;
  }

}
