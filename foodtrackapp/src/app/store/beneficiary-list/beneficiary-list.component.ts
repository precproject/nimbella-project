import { Component, OnInit } from '@angular/core';
import { BeneficiaryService } from 'src/app/_services/beneficiary.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-beneficiary-list',
  templateUrl: './beneficiary-list.component.html',
  styleUrls: ['./beneficiary-list.component.css']
})
export class BeneficiaryListComponent implements OnInit {

  beneficiarys: any;
  currentBeneficiary = null;
  currentIndex = -1;
  searchQuery: string;
  status = ""
  constructor(private s: BeneficiaryService, private u: UserService) { }

  ngOnInit() {
  }

  idToFood(id) {
    return this.u.idToFood(id);
  }
  getAll(): void {
    this.status = "Loading Data";

    this.s.getBeneficiary()
      .subscribe(
        data => {
          this.beneficiarys = data;
          this.status = "";
          console.log(data);
        },
        error => {
          this.status = "";

          console.log(error);
        });
  }

  refreshList(): void {
    this.getAll;
    this.currentBeneficiary = null;
    this.currentIndex = -1;
  }

  selectedBeneficiary(beneficiary, index): void {
    console.log(beneficiary)
    if (beneficiary.transactions) {
      for (var i = 0; i < beneficiary.transactions.length; i++) {
        beneficiary.transactions[i].item = this.u.idToFood(beneficiary.transactions[i].id);
      }
    }
    this.currentBeneficiary = beneficiary;
    this.currentIndex = index;
  }

  searchBeneficiary(): void {
    this.status = "Searching Beneficiary";

    var query = {
      "beneficiary": {
        "aadhar": this.searchQuery
      }
    }
    this.s.searchBeneficiary(query)
      .subscribe(
        data => {
          this.beneficiarys = data;
          console.log(data);
          this.status = "";
        },
        error => {
          console.log(error);
        });
  }
}
