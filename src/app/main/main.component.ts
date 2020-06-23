import { Component, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { HomeComponent } from '../home/home.component';
import { HelloComponent } from '../hello/hello.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('nav_opacity', [
      state('0', style({opacity: 0})),
      state('1', style({opacity: 1})),
      transition('0 => 1', animate('500ms ease')),
    ]),    
    trigger('console_hide', [
      state('0', style({height: '*', opacity: 1})),
      state('1', style({height: '0px', opacity: 0})),
      transition('0 => 1', animate('500ms ease')),
    ])
  ]
})
export class MainComponent implements OnInit {

  @ViewChild(HomeComponent)
  private home: HomeComponent;
  @ViewChild(HelloComponent)
  private hello: HelloComponent;
  @Output() changeBackground = new EventEmitter<boolean>();
  nav_opacity: string = "0";
  console_hide: string = "0";

  constructor() { }

  ngOnInit(): void {
  }

  typingFinished(event: string) {
    console.log(event);
    switch(event) {
      case "showNavbar":
        this.nav_opacity = '1';
        break;
      case "showAll":
        this.changeBackground.emit(true);    
        break;
      case "hideConsole":
        console.log("hideConsole pre animation")
        this.hello.console_hide = '1';
        break;
    }
  }

  nav_opacityDone(event: any) {
    if(this.nav_opacity === "1")
    this.hello.write(["uh...*********@@@@@self.show(all = true)"], "showAll", 1200);
  }

  hideConsole(event: any) {
    if(this.console_hide === '0')
    this.hello.write(["self.hide(console = true)"], "hideConsole")
  }

  showHome() {
    console.log("showHome");
    this.home.show();
  }

  console_hideDone(event: any) {
    console.log("console_hide is done");
  }

}
