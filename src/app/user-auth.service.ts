import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { signIn, signUp } from './user-interface';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  isuserlogin = new BehaviorSubject(false);
  url = 'http://devcreedapi.runasp.net/api/';
  // dependency injection
  constructor(private _HttpClient: HttpClient, private _Router: Router) {}
  // SignIn function
  SignIn(data: signIn): Observable<any> {
    return this._HttpClient.post(this.url + 'login', data);
  }
  // SignUp function
  SignUp(data: signUp): Observable<any> {
    return this._HttpClient.post(this.url + 'register', data);
  }
}
