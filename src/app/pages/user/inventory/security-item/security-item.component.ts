import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, finalize } from 'rxjs';
import { SecurityItem } from 'src/app/models/item/securityItem';
import { SecurityItemService } from 'src/app/services/item/security-item.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-security-item',
  templateUrl: './security-item.component.html',
  styleUrls: ['./security-item.component.scss']
})
export class SecurityItemComponent implements OnInit {
  securityItems: any = [] = [];
  columns: string[] = ['securityItemId', 'name', 'amount'];
  dataSource: any;
  clickedRows = new Set<SecurityItem>();
  hoveredRows = new Set<SecurityItem>();

  constructor(private itemService:SecurityItemService,
              private location:Location) { }

  ngOnInit(): void {
    this.loadSecurityItems();
  }

  loadSecurityItems() {
    this.itemService.listSecurityItems().pipe(
      catchError((error) => {
        Swal.fire({
          title: 'Error',
          text: 'Error al cargar los articulos de seguridad.',
          icon: 'error'});
          throw error;
      }),
      finalize(() => {

      })
    ).subscribe((data: any) => {
      this.dataSource = new MatTableDataSource<any>(data);
    });
  }

  goBack() {
    this.location.back();
  }

}
