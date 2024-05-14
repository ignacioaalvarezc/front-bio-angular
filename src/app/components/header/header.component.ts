import { Component, HostListener, Input, OnInit } from '@angular/core';
import { notifications, userItems } from './header-dummy-data';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  unprocessedOrdersCount: number;

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  canShowSearchAsOverlay = false;
  selectedLanguage: any;

  user: any = new Object();
  
  notifications = notifications;
  userItems = userItems;

  constructor(private loginService:LoginService,
              private router:Router,
              private orderService:OrderService) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
  }

  ngOnInit(): void {
    this.loadUnprocessedOrdersCount();
    this.checkCanShowSearchAsOverlay(window.innerWidth);
    this.loginService.getCurrentUser().subscribe((user: any) => {
      this.user = user;
    });
  }

  loadUnprocessedOrdersCount() {
    this.orderService.getUnprocessedOrdersCount().subscribe(count => {
      this.unprocessedOrdersCount = count;
    })
  }

  getHeadClass(): string {
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768) {
      styleClass = 'head-trimmed';
    } else {
      styleClass = 'head-md-screen';
    }
    return styleClass;
  }

  checkCanShowSearchAsOverlay(innerWidth: number): void {
    if(innerWidth < 845) {
      this.canShowSearchAsOverlay = true;
    } else {
      this.canShowSearchAsOverlay = false;
    }
  }

  performAction(item: any): void {
    if (item.label === 'Log out') {
      this.logout();
    } else {
      
    }
  }

  public logout() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres cerrar tu sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cerrar sesión'
    }).then((result) => {
      if(result.isConfirmed) {
        this.loginService.logout();
        this.router.navigate(['/']);
      }
    })
  }

  toHome() {
    this.router.navigate(['/user-dashboard/user-welcome'])
  }

}
