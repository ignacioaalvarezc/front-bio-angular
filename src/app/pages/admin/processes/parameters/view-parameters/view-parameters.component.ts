import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs';
import { ParameterService } from 'src/app/services/processes/parameter.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { UpdateParametersComponent } from '../update-parameters/update-parameters.component';

interface Parameter {
  parameterId: number;
  name: string;
  factor: number;
  description: string;
}

@Component({
  selector: 'app-view-parameters',
  templateUrl: './view-parameters.component.html',
  styleUrls: ['./view-parameters.component.scss']
})
export class ViewParametersComponent implements OnInit {


  parameters: any = [] = [];
  parameterId = 0;
  columns: string[] = ['parameterId', 'name', 'factor', 'description'];
  dataSource: any;
  clickedRows = new Set<Parameter>();
  hoveredRows = new Set<Parameter>();

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(private parameterService:ParameterService,
              private router:Router,
              private dialog:MatDialog) { }

  ngOnInit(): void {
      this.loadParameters();
  }

  loadParameters() {
    this.parameterService.getParameters().pipe(
      catchError((error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar los parametros', 'error');
        throw error;
      }),
      finalize(() => {

      })
    ).subscribe((data: any) => {
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  navigateToUpdateParameter(parameter: Parameter): void {
    const dialogRef = this.dialog.open(UpdateParametersComponent, {
      width: '600px',
      height: '500px',
      data: parameter
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadParameters();
    })
  }

  onRowMouseEnter(row: Parameter): void {
    this.hoveredRows.add(row);
  }

  onRowMouseLeave(row: Parameter): void {
    this.hoveredRows.delete(row);
  }

}
