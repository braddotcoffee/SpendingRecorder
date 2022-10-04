import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

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
  @Input()
  events!: Observable<void>;

  constructor() { }

  ngOnInit(): void {
    this.events.subscribe(() => this.translationClass = this.LEFT_SIDE);
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
