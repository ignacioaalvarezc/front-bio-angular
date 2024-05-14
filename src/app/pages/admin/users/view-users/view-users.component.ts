import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { catchError, finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';

interface User {
  userId: number;
  role: string;
  enabled: boolean;
  username: string;
  name: string;
  email: string;
}

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit {

  users:any = [] = [];
  userRoles: { [key: number]: string} = {};
  columns: string[] = ['userId', 'role', 'username', 'name', 'email', 'enabled'];
  dataSource: any;
  clickedRows = new Set<User>();
  hoveredRows = new Set<User>();
  searchData: any[];

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(private userService:UserService,
              private router:Router,
              private dialog:MatDialog,
              private location:Location) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.listUsers().pipe(
      catchError((error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar los usuarios', 'error');
        throw error;
      }),
      finalize(() => {

      })
    ).subscribe((data: any) => {
      this.users = this.sortUsersByAdmin(data);
      this.dataSource = new MatTableDataSource<any>(this.users);
      this.dataSource.paginator = this.paginator;
    });
  }

  private sortUsersByAdmin(users: any[]): any[] {
    return users.sort((a, b) => {
      const roleA = a.authorities[0].authority;
      const roleB = b.authorities[0].authority;

      return roleA === 'ADMIN' ? -1 : roleB === 'USER' ? 1 : 0;
    });
  }

  navigateToUpdateUser(user: User): void {
    this.router.navigate(['/admin/users/id/', user.userId]);
  }

  onRowMouseEnter(row: User): void {
    this.hoveredRows.add(row);
  }

  onRowMouseLeave(row: User): void {
    this.hoveredRows.delete(row);
  }

  goBack(): void {
    this.location.back();
  }  

  clearDateFilter() {
    
    }


  exportPdf() {

  }

  exportExcel() {
    
  }

}

