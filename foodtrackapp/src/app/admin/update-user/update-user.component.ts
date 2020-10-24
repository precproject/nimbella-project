import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  user: any = {}
  id: any;
  aadhar: any = "";
  status: string = "";
  constructor(private s: AdminService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadData();
  }


  loadData(): void {
    var query = {
      "id": this.id
    }
    this.s.updateAccount(query)
      .subscribe(
        data => {
          this.user = data.beneficiary[0];
          console.log(this.user);
        },
        error => {
          console.log(error);
        });
  }

  update() {
    var query = {
      "id": this.id,
      "user": this.user
    }
    this.s.updateAccount(query)
      .subscribe(
        data => {
          this.user = data;
          console.log(this.user);
          status = "Updated User" + this.user
          this.user = {};
        },
        error => {
          status = "Error " + error
          console.log(error);
        });
  }

}
