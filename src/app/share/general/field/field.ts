import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpService } from '../../../services/http-service';
import { BehaviorSubject, filter, firstValueFrom } from 'rxjs';
class Post {
  userId?: number;
  id?: number | null;
  title?: string;
  body?: string;
  constructor(userId: number, id: number | null, title: string, body: string) {
    this.userId = userId;
    this.id = id;
    this.title = title;
    this.body = body;
  }
}
@Component({
  selector: 'app-field',
  standalone: false,
  templateUrl: './field.html',
  styleUrl: './field.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Field {
  private _value: string = '';
  private notificationSubject = new BehaviorSubject<string | null>(null);
  public notification$ = this.notificationSubject
    .asObservable()
    .pipe(filter((noti) => noti !== null));
  @Input()
  public set value(value: string) {
    this._value = value;
  }
  public get value() {
    // console.log('getting');
    return this._value;
  }
  @Output()
  public clicked = new EventEmitter<string>();

  constructor(private httpService: HttpService) {}
  onClicked() {
    this.clicked.emit(this.value.toUpperCase());
  }
  async onPost() {
    try {
      const post = new Post(1, null, '', this.value);
      const res = await firstValueFrom(this.httpService.postRequest<Post>('/posts', post, {}));
      this.notificationSubject.next(res.id ? res.id.toString() : '2');
    } catch (error) {
      console.error(error);
    }
  }
}
