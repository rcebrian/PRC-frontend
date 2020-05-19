import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators, AbstractControl} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth/auth.service';
import {TokenStorageService} from '../../../services/auth/token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]),
    surnames: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]),
    nif: new FormControl('', [Validators.required, this.dniValidator()]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{9}$')]),
    email: new FormControl('', [Validators.required, Validators.minLength(8), Validators.email]),
    password: new FormControl('', [Validators.required, this.passwordValidator()]),
    password_confirmation: new FormControl('', [Validators.required, this.samePassword()]),
    role: new FormControl('2'),
  });

  errorDni: String;
  errorPhoneNumber: String;
  errorEmail: String;

  constructor(private router: Router, private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
  }

  registrer() {
    this.authService.register(this.userForm.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.access_token);
        this.tokenStorage.saveUser(data.user);
        this.redirectToDashboard();
      },
      err => {
        console.log(err);
        err.error.errors.forEach(error => {
          if (error[0] === 'The dni has already been taken.') {
            this.errorDni = error[0];
          } else if (error[0] === 'The phone number has already been taken.') {
            this.errorPhoneNumber = error[0];
          } else {
            this.errorEmail = error[0];
          }
        });
      }
    );
  }

  // ----------------------------Validation functions ------------------------------
  dniValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
      const nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET ]$/i;
      const nieRexp = /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
      const str = control.value.toString().toUpperCase();

      if (!nifRexp.test(str) && !nieRexp.test(str)) { return {'dniIncorrect': {value: control.value}}; }

      const nie = str
        .replace(/^[X]/, '0')
        .replace(/^[Y]/, '1')
        .replace(/^[Z]/, '2');

      const constter = str.substr(-1);
      // tslint:disable-next-line:radix
      const charIndex = parseInt(nie.substr(0, 8)) % 23;

      if (validChars.charAt(charIndex) === constter) { return null; }

      return {'dniIncorrect': {value: control.value}};
    };
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const minRexp = /[a-z]/g;
      const mayRexp = /[A-Z]/g;
      const numRexp = /[@$!_%*#?&]/g;
      const str = control.value;

      if (str.match(minRexp) != null && str.match(mayRexp) != null && str.match(numRexp) != null) {
        return null;
      }

      return {'passwordIncorrect': {value: control.value}};
    };
  }

  samePassword(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (this.userForm != null) {
        if (control.value === this.userForm.value.password) {
          return null;
        }
      }
      return {'samePasswordIncorrect': {value: control.value}};
    };
  }

  redirectToDashboard(): void {
    this.router.navigateByUrl('/');
  }
}
