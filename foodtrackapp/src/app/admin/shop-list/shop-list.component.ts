import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/_services/shop.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {

  shops: any;
  currentShop = null;
  currentIndex = -1;
  searchQuery: string;
  status = "";
  filter: string;
  constructor(private s: ShopService, private u: UserService) { }

  ngOnInit() {
  }


  getAll(): void {
    this.status = "Loading Data";
    this.s.searchShop({})
      .subscribe(
        data => {
          this.shops = data;
          this.status = "";

          console.log(data);
        },
        error => {
          this.status = "Error Loading Data";

          console.log(error);
        });
  }

  refreshList(): void {
    this.getAll;
    this.currentShop = null;
    this.currentIndex = -1;
  }

  selectedShop(shop, index): void {
    console.log(shop)
    if (shop.transactions) {
      for (var i = 0; i < shop.transactions.length; i++) {
        shop.transactions[i].item = this.u.idToFood(shop.transactions[i].id);
      }
    }
    this.currentShop = shop;
    this.currentIndex = index;
  }

  searchShop(): void {
    this.status = "Searching Shop";
    var query = {}
    query[this.filter] = this.searchQuery;
    this.s.searchShop(query)
      .subscribe(
        data => {
          this.shops = data;
          this.status = "";

          console.log(data);
        },
        error => {
          this.status = "No Entry Found";

          console.log(error);
        });
  }

}
