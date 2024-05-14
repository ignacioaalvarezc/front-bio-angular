import { Component, HostListener, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-welcome',
  templateUrl: './user-welcome.component.html',
  styleUrls: ['./user-welcome.component.scss']
})
export class UserWelcomeComponent implements OnInit {
  innerWidth: any;

  user: any = new Object();

  constructor(public login:LoginService) { }

  ngOnInit(): void {
    this.login.getCurrentUser().subscribe((user: any) => {
      this.user = user;
    });
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }
}
