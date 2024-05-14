import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  user:any = new Object();

  constructor(private login: LoginService) { }

  ngOnInit(): void {
    this.login.getCurrentUser().subscribe((user: any) => {
      this.user = user; // UPDATE THE USER VARIABLE WHEN THE USER CHANGES
    });
  }

}
