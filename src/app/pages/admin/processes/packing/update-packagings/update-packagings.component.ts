import { DatePipe, Location } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PackagingService } from 'src/app/services/packing/packaging.service';
import { ResponsibleService } from 'src/app/services/processes/responsible.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-packagings',
  templateUrl: './update-packagings.component.html',
  styleUrls: ['./update-packagings.component.scss'],
  providers: [DatePipe]
})
export class UpdatePackagingsComponent implements OnInit {

  packagingId = 0;
  packaging: any = {};
  responsibles: any;

  constructor(private route:ActivatedRoute,
              private packagingService:PackagingService,
              private responsibleService:ResponsibleService,
              private router:Router,
              private location:Location,
              private datePipe:DatePipe) { }

  ngOnInit(): void {
    this.packagingId = this.route.snapshot.params['packagingId'];
    this.responsibleService.listResponsibles().subscribe(
      (data:any) => {
        this.responsibles = data;
      },
      (error) => {
        alert('Error al cargar los responsables');
      }
    );
    this.packagingService.getPackaging(this.packagingId).subscribe(
      (data:any) => {
        this.packaging = data;
        console.log(this.packaging);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  public updatePackaging() {
    Swal.fire({
      title: 'Confirmar actualización',
      text: '¿Estás seguro de que quieres actualizar este empaquetado?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, actualizar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.packaging.numberOfPackages !== '') {
          const totalStraws= Number(this.packaging.numberOfPackages) * Number(this.packaging.boxType.strawAmount);
          this.packaging.numberOfStraws = Math.round(totalStraws).toString();
        }
        this.packaging.date = this.datePipe.transform(this.packaging.date, 'yyyy-MM-dd');
        this.packagingService.updatePackaging(this.packagingId, this.packaging).subscribe(
          (data) => {
            console.log(data);
            Swal.fire('Éxito', 'El empaquetado ha sido actualizado con éxito', 'success').then(() => {
              this.router.navigate(['admin/view-packagings']);
            });
          },
          (error) => {
            Swal.fire('Error', 'El empaquetado no ha sido actualizado', 'error').then(
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
