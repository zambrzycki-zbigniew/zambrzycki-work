import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @ViewChild(HomeComponent)
  private home: HomeComponent;

  constructor() { }

  ngOnInit(): void {
  }

  typingFinished(event: any) {
    this.home.typingFinished();
  }

}
