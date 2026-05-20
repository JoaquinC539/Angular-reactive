import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

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
  }
  public postRequest<T = any>(uri: string, body: any, options = {}): Observable<T> {
    try {
      return this.http.post<T>(this.apiUrl + this.cleanUri(uri), JSON.stringify(body), options);
    } catch (error) {
      return throwError((error: any) => new Error(`Error making post: ${error}`));
    }
  }
  public cleanUri(uri: string): string {
    return uri.startsWith('/') ? uri.slice(1) : uri;
  }
}
