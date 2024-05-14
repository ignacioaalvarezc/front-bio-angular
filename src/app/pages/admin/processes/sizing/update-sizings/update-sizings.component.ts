import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParameterService } from 'src/app/services/processes/parameter.service';
import { ResponsibleService } from 'src/app/services/processes/responsible.service';
import { SizingService } from 'src/app/services/processes/sizing.service';
import { StrawService } from 'src/app/services/processes/straw.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-sizings',
  templateUrl: './update-sizings.component.html',
  styleUrls: ['./update-sizings.component.scss'],
  providers: [DatePipe]
})
export class UpdateSizingsComponent implements OnInit {

  sizedBasketId = 0;
  sizing: any = {};
  responsibles: any;
  strawTypes: any;

  constructor(private route:ActivatedRoute,
              private sizingService:SizingService,
              private responsibleService:ResponsibleService,
              private strawService:StrawService,
              private parameterService:ParameterService,
              private router:Router,
              private location:Location,
              private datePipe:DatePipe) { }

  sizedFactor: number;

  ngOnInit(): void {
    this.sizedBasketId = this.route.snapshot.params['sizedBasketId'];
    this.parameterService.getSizedFactor().subscribe(
      factor => {
        this.sizedFactor = factor;
        console.log(this.sizedFactor)
      },
      error => {
        console.error('Error al obtener el factor de corte', error);
      }
    );
    this.responsibleService.listResponsibles().subscribe(
      (data:any) => {
        this.responsibles = data;
      },
      (error) => {
        alert('Error al cargar los responsables.');
      }
    );
    this.strawService.listStrawTypes().subscribe(
      (data:any) => {
        this.strawTypes = data;
      },
      (error) => {
        alert('Error al cargar los tipos de bíombilla.');
      }
    );
    this.sizingService.getSizing(this.sizedBasketId).subscribe(
      (data) => {
        this.sizing = data;
        console.log(this.sizing);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  goBack(): void {
    this.location.back();
  }

  calculateTotals(): void {
    if (this.sizing.weight !== '') {
      const total = parseFloat(this.sizing.weight) / this.sizedFactor;
      this.sizing.amount = Math.round(total).toString();
    }
  }

  public updateSizing() {
    const id = this.sizing.sizedBasketId;
    Swal.fire({
      title: 'Confirmar actualización',
      text: `¿Estás seguro de que quieres actualizar el dimensionado N° ${id}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, actualizar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.calculateTotals();
        this.sizing.date = this.datePipe.transform(this.sizing.date, 'yyyy-MM-dd');
        this.sizingService.updateSizing(this.sizedBasketId, this.sizing).subscribe(
          (data) => {
            console.log(data);
            Swal.fire('Éxito', `El dimensionado N° ${id} ha sido actualizado correctamente`, 'success').then(() => {
              this.router.navigate(['admin/view-sizings']);
            });
          },
          (error) => {
            Swal.fire('Error', `El dimensionado N° ${id} no ha sido actualizado`, 'error').then(
              (e) => {
                console.log(e);
              }
          );
        }
      );
    }
  });
  }
}