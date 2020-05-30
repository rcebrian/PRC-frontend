import {Component, OnInit} from '@angular/core';
import {navItems} from '../../_nav';
import {TokenStorageService} from '../../@core/services/auth/token-storage.service';
import {AuthService} from '../../@core/services/auth/auth.service';
import {User} from '../../@core/models/user';

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
  interval;

  constructor(private tokenStorage: TokenStorageService, private authService: AuthService) {
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  ngOnInit(): void {
    // @ts-ignore
    this.interval = setInterval(this.checkToken.bind(this), 30000);
    this.user = this.tokenStorage.getUser();
    if (this.user) {
      this.isLoggedIn = true;
      if (this.user.role === 1) {
        this.admin = true;
        this.sidebarToggleValue = 'lg';
      }
    }
  }

  submitLogOut() {
    this.authService.logOut().subscribe(res => {
      this.isLoggedIn = false;
      this.admin = false;
      this.sidebarToggleValue = false;
      this.tokenStorage.signOut();
      window.location.reload(); // Reload all the page
    }, err => {
      console.log(err);
    });
  }

  checkToken() {
    if (this.tokenStorage.getTimeOut() != null) {
      const now = new Date();
      if (now >= new Date(this.tokenStorage.getTimeOut())) {
        this.authService.refreshToken().subscribe(
          data => {
            this.setToken(data.access_token);
          },
          err => {}
        );
      }
    } else {
      clearInterval(this.interval);
    }
  }

  setToken(token: string) {
    const now = new Date();
    this.tokenStorage.saveToken(token);
    this.tokenStorage.saveUser(this.user);
    this.tokenStorage.tokenTimeOut(new Date(now.getTime() + 55 * 60000));
  }

}
