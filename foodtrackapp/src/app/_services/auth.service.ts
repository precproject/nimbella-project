import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const AUTH_API = environment.apiUrl;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.get(AUTH_API + 'admin/login?username=' + credentials.username, httpOptions);
  }

  generateToken(payload): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      payload
    }, httpOptions);
  }

  authToken(payload): Observable<any> {
    return this.http.post(AUTH_API + 'login/auth', { payload }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'admin/addUser', {
      username: user.username,
      password: user.password,
      role: user.role
    }, httpOptions);
  }

}
