import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http-service';
import { catchError, EMPTY, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { DataContent, DataService } from './data-service';

export class Post {
  userId: number = 0;
  id: number = 0;
  title: string = '';
  body: string = '';
  constructor(userId = 0, id = 0, title = '', body = '') {}
}

@Component({
  selector: 'app-data',
  standalone: false,
  templateUrl: './data.html',
  styleUrl: './data.css',
})
export class Data implements OnInit {
  private errorsSub: Subject<string>;
  public errors$: Observable<string>;
  public posts$: Observable<DataContent>;

  constructor(private dataService: DataService) {
    this.errorsSub = new Subject();
    this.errors$ = this.errorsSub.asObservable();
    this.posts$ = this.dataService.data$.pipe(
      catchError((error) => {
        setTimeout(() => {
          this.errorsSub.next(`Error happened: ${error}`);
        });
        throw new Error('Error happened: ' + error);
      }),
    );
  }

  public ngOnInit(): void {
    this.dataService.getPosts('posts');
  }
  public trackById(index: number, dataValue: Post) {
    return dataValue.id;
  }
  public onClick($event: string) {
    alert(`Clicked ${$event}`);
  }
}
