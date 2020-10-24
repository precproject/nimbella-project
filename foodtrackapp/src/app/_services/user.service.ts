import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  idToState(id) {
    switch (id) {
      case "1":
        return "abc";
      case "36": return "Andhra Pradesh";
      case "1": return "Andaman and Nicobar Islands";
      case "2": return "Arunachal Pradesh";
      case "3": return "Assam";
      case "4": return "Bihar";
      case "5": return "Chandigarh";
      case "6": return "Chhattisgarh";
      case "7": return "Dadar and Nagar Haveli";
      case "8": return "Daman and Diu";
      case "9": return "Delhi";
      case "10": return "Lakshadweep";
      case "11": return "Puducherry";
      case "12": return "Goa";
      case "13": return "Gujarat";
      case "14": return "Haryana";
      case "15": return "Himachal Pradesh";
      case "16": return "Jammu and Kashmir";
      case "17": return "Jharkhand";
      case "18": return "Karnataka";
      case "19": return "Kerala";
      case "20": return "Madhya Pradesh";
      case "21": return "Maharashtra";
      case "22": return "Manipur";
      case "23": return "Meghalaya";
      case "24": return "Mizoram";
      case "25": return "Nagaland";
      case "26": return "Odisha";
      case "27": return "Punjab";
      case "28": return "Rajasthan";
      case "29": return "Sikkim";
      case "30": return "Tamil Nadu";
      case "31": return "Telangana";
      case "32": return "Tripura";
      case "33": return "Uttar Pradesh";
      case "34": return "Uttarakhand";
      case "35": return "West Bengal";
    }

  }

  idToFood(id) {
    switch (id) {
      case 1:
        return "Jowar";
      case 2: return "Bajra";
      case 3: return "Dal";
      case 4: return "Household";
    }
  }
  getShop(): Observable<any> {
    return this.http.get(API_URL + 'shop', { responseType: 'text' });
  }

  getBeneficiary(): Observable<any> {
    return this.http.get(API_URL + 'beneficiary', { responseType: 'text' });
  }

  getStats(): Observable<any> {
    return this.http.get(API_URL + 'stats', { responseType: 'text' });
  }

  getState(): Observable<any> {
    return this.http.get(API_URL + 'state', { responseType: 'text' });
  }

  getFood(): Observable<any> {
    return this.http.get(API_URL + 'food', { responseType: 'text' });
  }
}
