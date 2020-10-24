import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  user :any ={}
  submitted = false;
  status = {};
  constructor(private s: AdminService) { }

  ngOnInit() {
  }


  add(): void {
  
    this.s.registerStore(this.user)
      .subscribe(
        response => {
          console.log(response);
          status = "Added : " + response;
          this.submitted = true;
          this.user = {};
        },
        error => {
          status = "Error : " + error;
          console.log(error);
        });
  }


}
