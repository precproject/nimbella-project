import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string = "";
  username: string = "";
  status = "";
  um = "";
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().role;
      this.username = this.tokenStorage.getUser().username;
    }
    if (this.roles == "store") {
      console.log(this.roles)
      this.roles = "shop"
      console.log(this.roles)

    }
  }

  onSubmit() {
    this.status = "Logging In ..";
    this.authService.login(this.form).subscribe(
      data => {

        if (data.message = "Valid User" && this.form.password == data.user[0].password) {
          var user: any = {};
          user.id = data.user[0]._id;
          user.createdAt = data.user[0].createdAt;
          user.role = data.user[0].role;
          user.store = data.user[0].store;
          user.username = data.user[0].username;
          this.tokenStorage.saveUser(user);

          this.authService.generateToken(user).subscribe(
            data => {
              this.tokenStorage.saveToken(data.jwt);
              this.isLoginFailed = false;
              this.isLoggedIn = true;
              this.roles = this.tokenStorage.getUser().role;
              this.username = this.tokenStorage.getUser().username;

              this.status = "Authenticated ..";

              console.log(this.tokenStorage.getUser())
              this.reloadPage();
            },
            err => {
              this.errorMessage = err.error.message;
              this.isLoginFailed = true;
              this.status = "Error In Authentication  ..";

            }
          );
        }


      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.status = "Failed Authentication  ..";

      }
    );
  }

  reloadPage() {
    this.status = ""

    //window.location.reload();
  }
}
