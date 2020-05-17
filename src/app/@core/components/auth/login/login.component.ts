import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../../../services/auth/auth.service";
import {TokenStorageService} from "../../../services/auth/token-storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  email: string;

  constructor(private router: Router, private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.redirectToDashboard();
    }
  }
  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;

        console.log(JSON.stringify(data));
        this.redirectToDashboard();

        if (data.status === 401) {
          this.isLoginFailed = true;
        }

      },
      err => {
        this.isLoginFailed = true;
      }
    );
  }
  redirectToDashboard(): void {
    this.router.navigateByUrl('dashboard');

  }

  registerClick(): void {
    this.router.navigateByUrl('register');
  };

}
