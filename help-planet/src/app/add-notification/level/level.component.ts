import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss'],
})
export class LevelComponent implements OnInit {
  @Input() typeNotification:string = 'animal';
  @Output() onSelectLevel:EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
    console.log(this.typeNotification);
  }

  selectLevel(val:number){
    this.onSelectLevel.emit(val);
  }

}
