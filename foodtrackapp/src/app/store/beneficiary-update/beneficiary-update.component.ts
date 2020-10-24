import { Component, OnInit } from '@angular/core';
import { BeneficiaryService } from 'src/app/_services/beneficiary.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-beneficiary-update',
  templateUrl: './beneficiary-update.component.html',
  styleUrls: ['./beneficiary-update.component.css']
})
export class BeneficiaryUpdateComponent implements OnInit {

  beneficiary: any = {};
  aadhar: any;
  status = "";
  constructor(private s: BeneficiaryService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.aadhar = this.route.snapshot.paramMap.get('id');
    this.loadData();
  }

  loadData(): void {
    this.status = "Loading Beneficiary Data"
    var query = {
      "beneficiary": {
        "aadhar": this.aadhar
      }
    }
    this.s.searchBeneficiary(query)
      .subscribe(
        data => {
          this.beneficiary = data.beneficiary[0];
          console.log(this.beneficiary);
          this.status = ""

        },
        error => {
          this.status = "Error Loading Beneficiary Data"

          console.log(error);
        });


  }

  update() {
    this.s.updateBeneficiary(this.beneficiary)
      .subscribe(
        data => {
          this.beneficiary = data;
          console.log(this.beneficiary);
          this.status = "Updated Beneficiary" + this.beneficiary.name + " by store " + this.beneficiary.store + " on Aadhar " + this.beneficiary.aadhar + " with contact " + this.beneficiary.contact
          this.beneficiary = {};
        },
        error => {
          this.status = "Error " + error
          console.log(error);
        });
  }
}
