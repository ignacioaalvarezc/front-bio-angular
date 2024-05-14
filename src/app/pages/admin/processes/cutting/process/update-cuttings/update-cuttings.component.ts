import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CuttingService } from 'src/app/services/cutting/cutting.service';
import { ParameterService } from 'src/app/services/processes/parameter.service';
import { ResponsibleService } from 'src/app/services/processes/responsible.service';
import { StrawService } from 'src/app/services/processes/straw.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-cuttings',
  templateUrl: './update-cuttings.component.html',
  styleUrls: ['./update-cuttings.component.scss'],
  providers: [DatePipe]
})
export class UpdateCuttingsComponent implements OnInit{

  cuttingId = 0;
  cutting: any = {};
  strawTypes: any;
  responsibles: any;

  constructor(private route:ActivatedRoute,
              private cuttingService:CuttingService,
              private strawService:StrawService,
              private responsibleService:ResponsibleService,
              private router:Router,
              private location:Location,
              private datePipe:DatePipe,
              private parameterService:ParameterService) { }
  
  cutFactor: number;

  ngOnInit(): void {
    this.cuttingId = this.route.snapshot.params['cuttingId'];
    this.parameterService.getCutFactor().subscribe(
      factor => {
        this.cutFactor = factor;
        console.log(this.cutFactor)
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
    this.cuttingService.getCutting(this.cuttingId).subscribe(
      (data:any) => {
        this.cutting = data;
        console.log(this.cutting);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  calculateTotals(): void {
    if (this.cutting.totalWeight !== '') {
      const total = parseFloat(this.cutting.totalWeight) / this.cutFactor;
      this.cutting.strawAmount = Math.round(total).toString();
    }
  }

  public updateCutting() {
    const id = this.cutting.cuttingId;
    Swal.fire({
      title: 'Confirmar actualización',
      text: `¿Estás seguro de que quieres actualizar el corte N° ${id}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, actualizar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.calculateTotals();
        this.cutting.date = this.datePipe.transform(this.cutting.date, 'yyyy-MM-dd');
        this.cuttingService.updateCutting(this.cuttingId, this.cutting).subscribe(
          (data) => {
            console.log(data);
            Swal.fire('Éxito', `El proceso de corte N° ${id} ha sido actualizado con éxito`, 'success').then(() => {
              this.router.navigate(['admin/view-cuttings']);
            });
          },
          (error) => {
            Swal.fire('Error', `El proceso de corte N° ${id} no ha sido actualizado`, 'error').then(
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
