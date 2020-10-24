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

export class ShopService {

  constructor(private http: HttpClient) { }

  addShop(shop): Observable<any> {
    return this.http.post(AUTH_API + 'shop/addShop', {
      name: shop.store,
      state: shop.name,
      city: shop.aadhar,
      town: shop.town,
      address: shop.address,
      contact: shop.contact
    }, httpOptions);
  }

  addBeneficiaryToShop(shop): Observable<any> {
    return this.http.put(AUTH_API + 'shop/addBeneficiary', {
      store: shop.store,
      beneficiary: shop.beneficiary
    }, httpOptions);
  }

  getShopByID(shop): Observable<any> {
    return this.http.get(AUTH_API + "shop/getShop?id=" + shop.id, httpOptions);
  }

  searchShop(shop): Observable<any> {
    return this.http.post(AUTH_API + "shop/searchShop", {
      shop
    }, httpOptions);
  }

  updateShop(shop): Observable<any> {
    return this.http.put(AUTH_API + "shop/updateShop", {
      id: shop.id,
      shop: shop.shop
    }, httpOptions);
  }

  deleteShop(shop): Observable<any> {
    return this.http.delete(AUTH_API + "shop/deleteShop?id=" + shop.id, httpOptions);
  }

  countShop(shop): Observable<any> {
    return this.http.get(AUTH_API + "shop/count", httpOptions);
  }
}
