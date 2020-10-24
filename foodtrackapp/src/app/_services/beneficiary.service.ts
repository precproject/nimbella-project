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
export class BeneficiaryService {

  constructor(private http: HttpClient) { }

  addBeneficiary(beneficiary): Observable<any> {
    return this.http.post(AUTH_API + 'beneficiary/addBeneficiary', {
      store: beneficiary.store,
      name: beneficiary.name,
      aadhar: beneficiary.aadhar
    }, httpOptions);
  }

  getBeneficiary(): Observable<any> {
    return this.http.get(AUTH_API + 'beneficiary/beneficiary', httpOptions);
  }

  distributeFoodToBeneficiary(beneficiary): Observable<any> {
    return this.http.put(AUTH_API + 'beneficiary/distributeFood', {
      id: beneficiary.id,
      transactions: beneficiary.transactions
    }, httpOptions);
  }

  updateBeneficiary(beneficiary): Observable<any> {
    return this.http.put(AUTH_API + 'beneficiary/updateBeneficiary', {
      id: beneficiary.id,
      beneficiary: beneficiary.beneficiary
    }, httpOptions);
  }

  searchBeneficiary(beneficiary): Observable<any> {
    return this.http.post(AUTH_API + 'beneficiary/searchBeneficiary', {
      beneficiary: beneficiary.beneficiary
    }, httpOptions);
  }

  deleteBeneficiary(beneficiary): Observable<any> {
    return this.http.delete(AUTH_API + 'beneficiary/deleteBeneficiary?id=' + beneficiary.id, httpOptions);
  }

  countBeneficiary(beneficiary): Observable<any> {
    return this.http.get(AUTH_API + 'beneficiary/count', httpOptions);
  }


}
