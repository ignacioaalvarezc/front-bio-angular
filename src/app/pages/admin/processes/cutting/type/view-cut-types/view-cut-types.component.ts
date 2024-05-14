import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs';
import { CutType } from 'src/app/models/cutting/cutType';
import { CutTypeService } from 'src/app/services/cutting/cut-type.service';
import Swal from 'sweetalert2';
import { UpdateCutTypesComponent } from '../update-cut-types/update-cut-types.component';


@Component({
  selector: 'app-view-cut-types',
  templateUrl: './view-cut-types.component.html',
  styleUrls: ['./view-cut-types.component.scss']
})
export class ViewCutTypesComponent implements OnInit {

  columns: string[] = ['cutTypeId', 'name', 'factor', 'description', 'enabled'];
  cutTypes: any = [] = [];
  dataSource: any;
  clickedRows = new Set<CutType>();
  hoveredRows = new Set<CutType>();

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(private cutTypeService:CutTypeService,
              private router:Router,
              private dialog:MatDialog) { }

  ngOnInit(): void {
    this.loadCutTypes();
  }

  loadCutTypes() {
    this.cutTypeService.listCutTypes().pipe(
      catchError((error) => {
        console.log(error);
        Swal.fire('Error',
                  'Error al cargar los tipos de corte.',
                  'error');
        throw error;
      }),
      finalize(() => {

      })
    ).subscribe((data:any) => {
      this.dataSource = new MatTableDataSource<any>(data);   
      this.dataSource.paginator = this.paginator;
    })
  }

  onRowMouseEnter(row: CutType): void {
    this.hoveredRows.add(row);
  }

  onRowMouseLeave(row: CutType): void {
    this.hoveredRows.delete(row);
  }

  navigateToUpdateCutType(cutType: CutType): void {
    const dialogRef = this.dialog.open(UpdateCutTypesComponent, {
      width: '600px',
      height: '500px',
      data: cutType
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadCutTypes();
    })
  }



}
