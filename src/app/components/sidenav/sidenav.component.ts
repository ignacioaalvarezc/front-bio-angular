import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { adminNavData } from './admin-navData';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import Swal from 'sweetalert2';
import { INavbarData, fadeInOut } from './inavbar';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    fadeInOut,
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms',
        keyframes([
          style({transform: 'rotate(0deg)', offset: '0'}),
          style({transform: 'rotate(2turn)', offset: '1'})
        ]))
      ])
    ])
  ]
})
export class SidenavComponent implements OnInit{

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  adminNavData = adminNavData;
  screenWidth = 0;
  multiple: boolean = false;

  isAdmin: boolean = false;
  isUser: boolean = false;
  categories: any;
  indexDivider: number = 5;

  constructor(private loginService:LoginService,
              private router:Router,
              private elementRef: ElementRef) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.closeSidenav();
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    if (this.loginService.isLoggedIn()) {
      this.isAdmin = this.loginService.getUserRole() === 'ADMIN';
      this.isUser = this.loginService.getUserRole() === 'USER';
    }
    this.loginService.loginStatusSubject.subscribe(loggedIn => {
      if (loggedIn) {
        this.isAdmin = this.loginService.getUserRole() === 'ADMIN';
        this.isUser = this.loginService.getUserRole() === 'USER';
      }
    });  
  }



  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  toggleExpand(data: any): void {
    if (data.subItems && data.subItems.length > 0) {
      data.expanded = !data.expanded;
    }
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  shouldShowSidebar(): boolean {
    return this.loginService.isLoggedIn();
  }  

  handleClick(item: INavbarData): void {
    this.shrinkItems(item);
    item.expanded = !item.expanded
  }

  shrinkItems(item: INavbarData): void {
    if(!this.multiple) {
      for(let modelItem of this.adminNavData) {
        if (item !==modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
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
        this.router.navigate(['/'])
      }
    });
  }

  getActiveClass(data: INavbarData): string {
    return this.router.url.includes(data.routeLink) ? 'active' : '';
  }
  
}
