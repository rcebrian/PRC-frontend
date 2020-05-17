import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../../services/auth/auth.service";
import {TokenStorageService} from "../../../services/auth/token-storage.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginFailed = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.min(6)])
  });

  constructor(private router: Router, private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.redirectToDashboard();
    }
  }


  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data.user);

          this.isLoginFailed = false;

          // console.log(JSON.stringify(data));
          this.redirectToDashboard();
        },
        err => {
          this.isLoginFailed = true;
          this.loginForm.reset();
        }
      );
    }
  }

  redirectToDashboard(): void {
    this.router.navigateByUrl('/');

  }

  registerClick(): void {
    this.router.navigateByUrl('register');
  };

}
