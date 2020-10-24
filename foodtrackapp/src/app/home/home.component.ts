import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AdminService } from '../_services/admin.service';
import { ShopService } from '../_services/shop.service';
import { BeneficiaryService } from '../_services/beneficiary.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content: string;
  bcount: any = "";
  scount: any = "";
  beneficiarys = "";
  constructor(private userService: UserService, private adminService: AdminService, private shopService: ShopService, private beneficiaryService: BeneficiaryService) { }

  ngOnInit() {
    this.loadCount();
    /*
    this.userService.getStats().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
    */
  }

  loadCount() {
    var shop = "";
    this.shopService.countShop(shop).subscribe(
      data => {
        this.scount = data.store;
      },
      err => {
        this.scount = 0;
      }
    );

    var beneficiary = "";
    this.beneficiaryService.countBeneficiary(beneficiary).subscribe(
      data => {
        this.bcount = data.beneficiary;
      },
      err => {
        this.bcount = 0;
      }
    );
  }
}
