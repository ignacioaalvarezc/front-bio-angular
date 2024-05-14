import { Location, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReceptionService } from 'src/app/services/reception/reception.service';
import { ResponsibleService } from 'src/app/services/processes/responsible.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-update-receptions',
  templateUrl: './update-receptions.component.html',
  styleUrls: ['./update-receptions.component.scss'],
  providers: [DatePipe]
})
export class UpdateReceptionsComponent implements OnInit {

  receptionId = 0;
  reception: any = {};
  responsibles: any;
  
  constructor(private route:ActivatedRoute,
              private receptionService:ReceptionService,
              private responsibleService:ResponsibleService,
              private router:Router,
              private location:Location,
              private datePipe:DatePipe,
              public dialog: MatDialog) { }

  

  ngOnInit(): void {
    this.receptionId = this.route.snapshot.params['receptionId'];
    this.responsibleService.listResponsibles().subscribe(
      (data:any) => {
        this.responsibles = data;
      },
      (error) => {
        alert('Error al cargar los responsables');
      }
    );
    this.receptionService.getReception(this.receptionId).subscribe(
      (data) => {
        this.reception = data;
        console.log(this.reception);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  public updateReception() {
    Swal.fire({
      title: 'Confirmar actualización',
      text: '¿Estás seguro de que quieres actualizar esta recepción?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, actualizar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.reception.date = this.datePipe.transform(this.reception.date, 'yyyy-MM-dd');
        this.receptionService.updateReception(this.receptionId, this.reception).subscribe(
          (data) => {
            console.log(data);
            Swal.fire('Recepción actualizada', 'La recepción ha sido actualizada con éxito', 'success').then(() => {
              this.router.navigate(['admin/view-receptions']);
            });
          },
          (error) => {
            Swal.fire('Recepción no actualizada', 'La recepción no ha sido actualizada', 'error').then(
              (e) => {
                console.log(e);
              }
          );
        }
      );
    }
  });
  }

  goBack(): void {
    this.location.back();
  }
  

}
