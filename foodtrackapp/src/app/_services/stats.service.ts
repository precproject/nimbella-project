import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const AUTH_API = environment.apiUrl;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class StatsService {

  constructor(private http: HttpClient) { }

  getStateStats(stat): Observable<any> {
    return this.http.post(AUTH_API + 'stats?state=' + stat.state, httpOptions);
  }

  getStats(): Observable<any> {
    return this.http.post(AUTH_API + 'stats', httpOptions);
  }
}
