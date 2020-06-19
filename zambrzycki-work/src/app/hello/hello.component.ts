import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

import {Typer, TyperInterval} from '../classes/typer'

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.scss'],
})
export class HelloComponent implements OnInit {

  @Output() typingFinished = new EventEmitter<boolean>();

  interval: TyperInterval = new TyperInterval(
    3000, 500, 0, 180, 0, 80, 30
  );
  helloAfter: string[] = ["Hello World", "I'm Zbigniew Zambrzycki.","I'm full-sack web@@@@@@@@@-stack web developer."];
  helloText: Typer = new Typer(this.helloAfter, this.interval);
  @ViewChild("hello") divView: ElementRef;


  constructor() { }

  ngOnInit(): void {
  }
  
  ngAfterViewInit() {
    this.interval = new TyperInterval(
      3000, 500, 0, 180, 0, 80, 30
    );
    this.helloAfter = ["Hello World", "I'm Zbigniew Zambrzycki.","I'm full-sack web@@@@@@@@@-stack web developer."];
    this.helloText = new Typer(this.helloAfter, this.interval);
    this.helloText.type();
    var comp = this;
    setTimeout(function () {console.log(comp.divView.nativeElement.offsetWidth); comp.typingFinished.emit(true)}, this.interval.totalTime+2000)
    // var i=3000;
    // helloAfter.forEach(line => {
    //   line.split(' ').forEach((word, key, arr) => {
    //     word.split('').forEach(character => {
    //         setTimeout(function() {comp.helloText+=character;}, i);
    //         i+=80+Math.floor(Math.random()*30);
    //       })     
    //       if (!Object.is(arr.length - 1, key)) {
    //         i+=100;
    //         setTimeout(function() {comp.helloText+=" ";}, i);
    //       }
    //   });
    //   i+=500;
    //   setTimeout(function() {comp.helloText+="<br><br>";}, i);
    //   i+=500;
    // });
    // i+=2000;
    // setTimeout(function () {comp.typingFinished.emit(true)}, i)
    // i=null;
    // contentChild is updated after the content has been checked
    console.log(comp.divView.nativeElement.offsetWidth)
  }

}
