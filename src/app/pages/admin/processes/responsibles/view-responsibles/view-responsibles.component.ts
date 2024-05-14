import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs';
import { ResponsibleService } from 'src/app/services/processes/responsible.service';
import Swal from 'sweetalert2';

interface Responsible {
  responsibleId: number;
  name: string;
  email: string;
  phoneNumber: number;
  enabled: boolean;
}

@Component({
  selector: 'app-view-responsibles',
  templateUrl: './view-responsibles.component.html',
  styleUrls: ['./view-responsibles.component.scss']
})
export class ViewResponsiblesComponent implements OnInit {

  responsibles: any = [] = [];
  columns: string[] = ['responsibleId', 'name', 'email', 'enabled'];
  dataSource: any;
  clickedRows = new Set<Responsible>();
  hoveredRows = new Set<Responsible>();

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(private responsibleService:ResponsibleService,
              private router:Router) { }

  ngOnInit(): void {
    this.loadResponsibles();
  }

  loadResponsibles() {
    this.responsibleService.listResponsibles().pipe(
      catchError((error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar los responsables', 'error');
        throw error;
      }),
      finalize(() => {

      })
    ).subscribe((data: any) => {
      this.dataSource = new MatTableDataSource<any>(data);   
      this.dataSource.paginator = this.paginator;
    });
  }

  navigateToUpdateResponsible(responsible: Responsible): void {
    this.router.navigate(['/admin/responsibles/id/', responsible.responsibleId]);
  }

  onRowMouseEnter(row: Responsible): void {
    this.hoveredRows.add(row);
  }

  onRowMouseLeave(row: Responsible): void {
    this.hoveredRows.delete(row);
  }

  
  toggleResponsibleStatus(responsibleId: any, newStatus: boolean, name: any) {
    const actionText1 = newStatus ? 'desbloquear' : 'bloquear';
    const actionText2 = newStatus ? 'desbloqueado' : 'bloqueado';

    Swal.fire({
      title: `¿Estas seguro de que quieres ${actionText1} al responsable ${name}?`,
      text: `El responsable será ${actionText2} y no podra ser asignado a ningún proceso.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed) {
        this.responsibleService.toggleResponsibleStatus(responsibleId, newStatus).subscribe(() => {
          Swal.fire({
            title: `Responsable ${name} ha sido ${actionText2} con éxito`,
            icon: `success`,
            confirmButtonText: 'OK'
          }).then(() => {
            this.loadResponsibles();
          });
        }, error => {
          console.error('Hubo un error al cambiar el estado del responsable.', error);
        });
      }
    });
  }

}
