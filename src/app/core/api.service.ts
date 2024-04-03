import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get(path: string, params: HttpParams = new HttpParams(), options: Object = {}): Observable<any> {
    return this.http.get(path, {
      params,
      observe: 'response',
      headers: new HttpHeaders({
        'content-type': 'application/json'
      }),
      ...options
    });
  }

  post(path: string, body: Object = {}, params: HttpParams = new HttpParams(), options: Object = {}): Observable<any> {
    return this.http.post(
      path,
      body,
      {
        observe: 'response',
        headers: new HttpHeaders({
          'content-type': 'application/json'
        }),
        params,
        ...options
      }
    );
  }

  postFile(path: string, body: Object = {}, options: Object = {}): Observable<any> {
    return this.http.post(
      path,
      body,
      {
        observe: 'response',
        ...options
      }
    );
  }

  patch(path: string, body: Object = {}): Observable<any> {
    return this.http.patch(
      path,
      body,
      {
        observe: 'response',
        headers: new HttpHeaders({
          'content-type': 'application/json'
        })
      }
    );
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      path,
      body,
      {
        observe: 'response',
        headers: new HttpHeaders({
          'content-type': 'application/json'
        })
      }
    );
  }

  delete(path: string, body: Object = {}, params: HttpParams = new HttpParams(), options: Object = {}): Observable<any> {
    return this.http.delete(
      path,
      {
        observe: 'response',
        headers: new HttpHeaders({
          'content-type': 'application/json'
        }),
        params,
        ...options,
        body
      },
    );
  }
}
