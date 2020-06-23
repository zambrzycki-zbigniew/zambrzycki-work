import { Component, ViewChild } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { MainComponent } from './main/main.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('background', [
      state('black', style({background: "#000000"})),
      state('white', style({background: "#AAAAAA"})),
      transition('black => white', animate('500ms ease'))
    ])
  ]
})
export class AppComponent {
  background = "black"
  title = 'zambrzycki-work';  
  @ViewChild(MainComponent)
  private main: MainComponent;

  changeBackground(event: any) {
    this.background = this.background === "black" ? "white" : "black";
  }  

  backgroundDone() {
    if(this.background === "white") {
      console.log("backgroundDone")
      this.main.showHome();
    }
  }
}
