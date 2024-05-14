import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from './change-password/change-password.component';

interface User {
  userId: number;
  name: string;
  username: string;
  email: string;
  password: string;
  phoneNumber: number;
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  

  users:any = [] = [];
  userId = 0;

  constructor(private loginService:LoginService,
              private location: Location,
              private userService:UserService,
              private dialog:MatDialog) { }

  ngOnInit(): void {
    this.users = this.loginService.getUser();
  }
  
  goBack(): void {
    this.location.back();
  }


  navigateToUpdatePassword(user: User): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '250px',
      height: '240px',
      data: user
    });
    dialogRef.afterClosed().subscribe(result => {
      this.users = this.loginService.getUser();
    })
  }



}
