import { HttpClient } from '@angular/common/http';
import { Injectable, signal, } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})

export class CommonService {

  baseUrl = 'https://tactyl-dev.online/api/';
  // baseUrl = 'https://tactyl.online/api/';
  //baseUrl = 'http://192.168.1.16:4009/api/';
  //baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(this.baseUrl + url);
  };

  post<T, U>(url: string, data: U): Observable<T> {
    return this.http.post<T>(this.baseUrl + url, data)
  };

  patch<T, U>(url: string, data: U): Observable<T> {
    return this.http.patch<T>(this.baseUrl + url, data)
  };

  update<T, U>(url: string, data: U): Observable<T> {
    return this.http.post<T>(this.baseUrl + url, data)
  };

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(this.baseUrl + url);
  };

  setToken(token: string) {
    localStorage.setItem('tactylAdminToken', token);
  }

  private refreshSidebarSource = new BehaviorSubject<void | null>(null);
  refreshSidebar$ = this.refreshSidebarSource.asObservable();

  triggerRefresh() {
    this.refreshSidebarSource.next(null);
  }


}
