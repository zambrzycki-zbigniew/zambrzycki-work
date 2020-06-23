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
      state('true', style({opacity: 0})),
      state('false', style({opacity: 1})),
      transition('true <=> false', animate('500ms ease'))
    ])
  ]
})

export class HomeComponent implements OnInit {
  hidden:boolean = true;
  
  @Output() hideConsole = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  show() {
    console.log("show")
    this.hidden=false;
  }

  hiddenDone(event: any) {
    if(this.hidden === false)
    this.hideConsole.emit(true);
  }

}
