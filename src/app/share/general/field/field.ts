import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-field',
  standalone: false,
  templateUrl: './field.html',
  styleUrl: './field.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Field {
  @Input()
  public value: string;
  @Output()
  public clicked = new EventEmitter<string>();

  constructor() {
    this.value = '';
  }
  onClicked() {
    this.clicked.emit(this.value.toUpperCase());
  }
}
