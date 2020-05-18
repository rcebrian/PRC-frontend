import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenStorageService} from "../services/auth/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private token: TokenStorageService, private router: Router) {
  }

  canActivate() {
    const role = this.token.getRole();
    if (role === 1) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

}
