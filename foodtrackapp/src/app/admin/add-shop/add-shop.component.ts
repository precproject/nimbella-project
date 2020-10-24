import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/_services/shop.service';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-add-shop',
  templateUrl: './add-shop.component.html',
  styleUrls: ['./add-shop.component.css']
})
export class AddShopComponent implements OnInit {

  user: any = {};
  store: any = {};
  submitted = false;
  status = "";
  constructor(private s: AdminService) { }

  ngOnInit() {
  }


  add(): void {
    this.store.username = this.user.username;
    var s = {
      username: this.user.username,
      password: this.user.password,
      role: this.user.role,
      store: this.store
    }
    console.log(s);
    console.log(this.store);
    console.log(this.user);
    this.status = "Adding Store ...";

    this.s.registerStore(s)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.status = "Added Store : Username " + response.user.username + "  StoreID " + response.user.store + " Password " + response.user.password + "  City " + this.store.city + " <br> State " + this.store.state;
          this.user = {};
        },
        error => {
          this.status = "Error : " + error;
          console.log(error);
        });
  }

}
