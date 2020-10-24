import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { ShopService } from '../_services/shop.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  store: any = "";
  constructor(private token: TokenStorageService, private s: ShopService, private u: UserService) { }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    console.log(this.currentUser)
    this.loadStoreData();
  }


  loadStoreData() {
    if (this.currentUser.role == "store") {
      var shop = {
        "id": this.currentUser.store
      }
      this.s.getShopByID(shop).subscribe(data => {
        this.store = data.store[0];
        this.store.state = this.u.idToState(this.store.state) + " - (" + this.store.state + ")";
        console.log(this.store)
      },
        err => {
        }
      );
    }

  }
}
