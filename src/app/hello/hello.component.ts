import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import {Typer, TyperInterval} from '../classes/typer'

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.scss'],
  animations: [   
    trigger('console_hide', [
      state('0', style({height: '*', overflow: 'hidden', padding: '1vh'})),
      state('1', style({height: '0px', overflow: 'hidden', padding: '0px'})),
      transition('0 => 1', animate('500ms ease')),
    ])
  ]
})
export class HelloComponent implements OnInit {

  @Output() typingFinished = new EventEmitter<string>();

  interval: TyperInterval = new TyperInterval(
    3000, 500, 0, 180, 0, 80, 30
  );
  typer: Typer;
  console_hide: string = '0';
  helloText = {"value": ""}
  @ViewChild("hello") divView: ElementRef;


  constructor() { }

  ngOnInit(): void {
  }
  
  ngAfterViewInit() {
    var helloAfter = [
      "#Hello World",
      "#I'm Zbigniew Zambrzycki.",
      "#I'm full-sack web@@@@@@@@@-stack web developer.",
      "",
      "self.show()"];
    this.typer = new Typer([], this.interval);
    this.helloText = this.typer.output
    this.write(helloAfter, "showNavbar", 3000)
  }

  write(text: string[], emitID: string, initialWait: number = 500) {
    this.typer.newInput(text);
    this.interval.initialWait = initialWait;
    this.typer.type();
    var comp = this;
    setTimeout(function () {
      comp.typingFinished.emit(emitID);
      comp.interval.clearTotal();
    }, this.interval.totalTime+500)
  }

  console_hideDone(event: any) {
    console.log("console hidden")
  }

}
