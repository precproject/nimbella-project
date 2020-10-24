import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ShopService } from 'src/app/_services/shop.service';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-shop-distribute',
  templateUrl: './shop-distribute.component.html',
  styleUrls: ['./shop-distribute.component.css']
})
export class ShopDistributeComponent implements OnInit {
  shop: any;
  id: string;
  transactions: any[] = [];
  food: any = {
    id: '',
    quantity: ''
  }
  status: string = '';
  constructor(private s: AdminService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

  }


  updateTransaction() {
    this.transactions.push(this.food);
    this.food = {};
    this.status = "added";
  }

  distribute() {
    var q = {
      "id": this.id,
      "transactions": this.transactions
    }
    console.log(q);
    this.s.distributeFoodToStore(q)
      .subscribe(
        data => {
          this.shop = data;
          this.transactions = [];
          this.food = {};
          console.log(data);
          this.status = "Distributed Food to Shop : <br> " + this.shop.store.name + " : : <br> state  " + this.shop.store.state + " : : <br> city " + this.shop.store.city
        },
        error => {
          this.status = "Error " + error
          console.log(error);
        });
  }
}
