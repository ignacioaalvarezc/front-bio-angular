import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs';
import { StrawService } from 'src/app/services/processes/straw.service';
import Swal from 'sweetalert2';
import { UpdateStrawTypesComponent } from '../update-straw-types/update-straw-types.component';
import { AddStrawTypesComponent } from '../add-straw-types/add-straw-types.component';

interface StrawType {
  strawTypeId: number;
  name: string;
  description: string;
  enabled: boolean;
}

@Component({
  selector: 'app-view-straw-types',
  templateUrl: './view-straw-types.component.html',
  styleUrls: ['./view-straw-types.component.scss']
})
export class ViewStrawTypesComponent implements OnInit {

  strawTypes: any = [] = [];
  strawTypeId = 0;
  columns: string[] = ['strawTypeId', 'name', 'description', 'enabled'];
  dataSource: any;
  clickedRows = new Set<StrawType>();
  hoveredRows = new Set<StrawType>();

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(private strawService:StrawService,
              private router:Router,
              private dialog:MatDialog) { }

  ngOnInit(): void {
    this.loadStrawTypes();
  }

  loadStrawTypes() {
    this.strawService.listStrawTypes().pipe(
      catchError((error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar los tipos de bombillas', 'error');
        throw error;
      }),
      finalize(() => {

      })
    ).subscribe((data: any) => {
      this.dataSource = new MatTableDataSource<any>(data);   
      this.dataSource.paginator = this.paginator;
    });
  }

  navigateToUpdateStrawType(strawType: StrawType): void {
    const dialogRef = this.dialog.open(UpdateStrawTypesComponent, {
      width: '600px',
      height: '500px',
      data: strawType
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadStrawTypes();
    })
  }

  navigateToAddStrawType(): void {
    const dialogRef = this.dialog.open(AddStrawTypesComponent, {
      width: '600px',
      height: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadStrawTypes();
    })
  }

  onRowMouseEnter(row: StrawType): void {
    this.hoveredRows.add(row);
  }

  onRowMouseLeave(row: StrawType): void {
    this.hoveredRows.delete(row);
  }

  toggleStrawTypeStatus(strawTypeId: any, newStatus: boolean, name: any) {
    const actionText1 = newStatus ? 'desbloquear' : 'bloquear';
    const actionText2 = newStatus ? 'desbloqueado' : 'bloqueado';

    Swal.fire({
      title: `¿Estas seguro de que quieres ${actionText1} el tipo de bíombilla ${name}?`,
      text: `El tipo de bíombilla será ${actionText2} y no podra ser asignado a ningún proceso.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed) {
        this.strawService.toggleStrawTypeStatus(strawTypeId, newStatus).subscribe(() => {
          Swal.fire({
            title: `Tipo de bíombilla ${name} ha sido ${actionText2} con éxito`,
            icon: `success`,
            confirmButtonText: 'OK'
          }).then(() => {
            this.loadStrawTypes();
          });
        }, error => {
          console.error('Hubo un error al cambiar el estado del tipo de bíombilla.', error);
        });
      }
    });
  }

  deleteStrawType(strawTypeId:any, name:any) {
    Swal.fire({
      title: `Eliminar tipo de bíombilla`,
      text: `¿Estas seguro que deseas eliminar el tipo de bíombilla ${name}?`,
      icon: 'warning',
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.strawService.deleteStrawType(strawTypeId).subscribe(
          (data) => {
            this.strawTypes = this.strawTypes.filter((strawType:any) => strawType.strawTypeId != strawTypeId);
            Swal.fire({
              title: 'Tipo de bíombilla eliminado con éxito',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              this.loadStrawTypes();
            });
          },
          (error) => {
            Swal.fire('Error', 'Error al eliminar el tipo de bíombilla', 'error');
          }
        )
      }
    })
  }

}
