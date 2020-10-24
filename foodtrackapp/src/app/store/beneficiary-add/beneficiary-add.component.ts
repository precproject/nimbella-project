import { Component, OnInit } from '@angular/core';
import { BeneficiaryService } from 'src/app/_services/beneficiary.service';

@Component({
  selector: 'app-beneficiary-add',
  templateUrl: './beneficiary-add.component.html',
  styleUrls: ['./beneficiary-add.component.css']
})
export class BeneficiaryAddComponent implements OnInit {
  beneficiary: any = {};
  submitted = false;

  constructor(private s: BeneficiaryService) { }

  ngOnInit() {
  }

  add(): void {
    const beneficiary = {
      name: this.beneficiary.name,
      aadhar: this.beneficiary.aadhar,
      contact: this.beneficiary.contact,
      store: '1'
    };

    this.s.addBeneficiary(beneficiary)
      .subscribe(
        response => {
          console.log(response);
          this.beneficiary = response;
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

}
