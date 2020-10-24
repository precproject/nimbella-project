import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = environment.apiUrl;


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  registerStore(user): Observable<any> {
    return this.http.post(AUTH_API + 'admin/addUser', {
      username: user.username,
      password: user.password,
      role: user.role,
      store: user.store
    }, httpOptions);
  }

  distributeFoodToStore(store): Observable<any> {
    return this.http.put(AUTH_API + 'admin/distribute', {
      id: store.id,
      transactions: store.transactions
    }, httpOptions);
  }

  updateAccount(user): Observable<any> {
    return this.http.put(AUTH_API + 'admin/account', {
      id: user.id,
      user: user.user
    }, httpOptions);
  }

  deleteUser(user): Observable<any> {
    return this.http.delete(AUTH_API + 'admin/account' + user.username, httpOptions);
  }

}
