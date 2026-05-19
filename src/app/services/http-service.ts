import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { debounce, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private apiUrl: string = 'https://jsonplaceholder.typicode.com/';
  constructor(private http: HttpClient) {}

  public getRequest<T = any>(uri: string): Observable<T> {
    try {
      return this.http.get<T>(this.apiUrl + this.cleanUri(uri));
    } catch {
      return throwError(() => new Error('Something happened'));
    }

    //
  }
  public cleanUri(uri: string): string {
    return uri.startsWith('/') ? uri.slice(1) : uri;
  }
}
