import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sliding-switch',
  templateUrl: './sliding-switch.component.html',
  styleUrls: ['./sliding-switch.component.scss']
})
export class SlidingSwitchComponent implements OnInit {
  private readonly LEFT_SIDE = "-translate-x-24";
  private readonly RIGHT_SIDE = "translate-x-24";
  translationClass: string = this.LEFT_SIDE;
  @Input() optionOne = '';
  @Input() optionTwo = '';
  @Output() updateSwitchEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  buttonOneWrapper() {
    this.translationClass = this.LEFT_SIDE;
    this.updateSwitchEvent.emit(this.optionOne);
  }

  buttonTwoWrapper() {
    this.translationClass = this.RIGHT_SIDE;
    this.updateSwitchEvent.emit(this.optionTwo);
  }

}
