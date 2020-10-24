import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BeneficiaryService } from 'src/app/_services/beneficiary.service';

@Component({
  selector: 'app-beneficiary-distribute',
  templateUrl: './beneficiary-distribute.component.html',
  styleUrls: ['./beneficiary-distribute.component.css']
})
export class BeneficiaryDistributeComponent implements OnInit {

  beneficiary: any;
  aadhar: any;
  transactions: any[] = [];
  food: any = {
    id: '',
    quantity: ''
  }
  status: string = '';
  constructor(private s: BeneficiaryService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.aadhar = this.route.snapshot.paramMap.get('id');
  }

  updateTransaction() {
    this.transactions.push(this.food);
    this.food = {};
    console.log(this.transactions);
    console.log(this.food);
    this.status = "added to list";
  }

  distribute() {
    var q = {
      "id": this.aadhar,
      "transactions": this.transactions
    }
    this.s.distributeFoodToBeneficiary(q)
      .subscribe(
        data => {
          this.beneficiary = data;
          this.transactions = [];
          this.food = {};
          console.log(data);
          this.status = "Distributed Food to " + this.beneficiary.beneficiary.name + " by store " + this.beneficiary.beneficiary.store + " on Aadhar " + this.beneficiary.beneficiary.aadhar
        },
        error => {
          this.status = "Error " + error
          console.log(error);
        });
  }


}
