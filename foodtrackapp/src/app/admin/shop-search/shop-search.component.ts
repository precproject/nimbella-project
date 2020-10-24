import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/_services/shop.service';

@Component({
  selector: 'app-shop-search',
  templateUrl: './shop-search.component.html',
  styleUrls: ['./shop-search.component.css']
})
export class ShopSearchComponent implements OnInit {

  shops: any;
  currentShop = null;
  currentIndex = -1;
  searchQuery: any;

  constructor(private s: ShopService) { }

  ngOnInit() {
  }


  getAll(): void {
    this.s.searchShop(this.searchQuery)
      .subscribe(
        data => {
          this.shops = data;
          console.log(data);
        },
        error => {
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
    this.currentShop = shop;
    this.currentIndex = index;
  }

  searchShop(): void {
    var query = {
      "state": this.searchQuery.state
    }
    this.s.searchShop(query)
      .subscribe(
        data => {
          this.shops = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}
