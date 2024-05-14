import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from './services/login.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'bíombillas';
  
  isLoginPage: boolean = false;
  isSideNavCollapsed = false;
  isAdmin: boolean = false;
  isUser: boolean = false;
  isUpdateParameterPage: boolean = false;
  screenWidth = 0;

  constructor(private router:Router,
              private login:LoginService) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = this.router.url === '/';
      }
      if (event instanceof NavigationEnd) {
        this.isUpdateParameterPage = this.router.url === '/admin/view-parameters';
      }
    });
    if (this.login.isLoggedIn()) {
      this.isAdmin = this.login.getUserRole() === 'ADMIN';
      this.isUser = this.login.getUserRole() === 'USER';
    }
    this.login.loginStatusSubject.subscribe(loggedIn => {
      if (loggedIn) {
        this.isAdmin = this.login.getUserRole() === 'ADMIN';
        this.isUser = this.login.getUserRole() === 'USER';
      }
    });  
  }

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }


}


