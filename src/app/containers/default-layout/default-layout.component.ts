import {Component, OnInit} from '@angular/core';
import {navItems} from '../../_nav';
import {TokenStorageService} from "../../@core/services/auth/token-storage.service";
import {AuthService} from "../../@core/services/auth/auth.service";
import {User} from "../../@core/models/user";

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;
  admin = false;
  sidebarToggleValue: any = false;

  isLoggedIn = false;
  user: User;


  constructor(private tokenStorage: TokenStorageService, private authService: AuthService) {
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser();
    if (this.user) {
      this.isLoggedIn = true;
      if (this.user.role == 1) {
        this.admin = true
        this.sidebarToggleValue = 'lg';
      }
    }
  }

  submitLogOut() {
    this.authService.logOut().subscribe(res => {
      this.isLoggedIn = false;
      this.tokenStorage.signOut();
    }, err => {
      console.log(err);
    });
  }

}
