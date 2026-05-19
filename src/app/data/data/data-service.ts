import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http-service';
import { BehaviorSubject, filter, map, Observable, startWith, switchMap } from 'rxjs';
import { Post } from './data';

export interface DataContent {
  loading: boolean;
  posts: Post[];
}
@Injectable({
  providedIn: 'root',
})
export class DataService {
  private uriSub = new BehaviorSubject<string | null>(null);
  public data$: Observable<DataContent>;
  constructor(private httpService: HttpService) {
    this.data$ = this.uriSub.pipe(
      filter((uri) => uri !== null),
      switchMap((uri) => this.httpService.getRequest<Post[]>(uri)),
      map((posts) => ({ loading: false, posts }) as DataContent),
      startWith({ loading: true, posts: [] }),
    );
  }

  public getPosts(uri: string): void {
    console.log(this.uriSub.getValue());
    this.uriSub.next(uri);
  }
}
