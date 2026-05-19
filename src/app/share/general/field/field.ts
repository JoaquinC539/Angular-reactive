import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-field',
  standalone: false,
  templateUrl: './field.html',
  styleUrl: './field.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Field {
  private _value: string = '';
  @Input()
  public set value(value: string) {
    // console.log('setting');
    this._value = value;
  }
  public get value() {
    // console.log('getting');
    return this._value;
  }
  @Output()
  public clicked = new EventEmitter<string>();

  constructor() {}
  onClicked() {
    this.clicked.emit(this.value.toUpperCase());
  }
}
