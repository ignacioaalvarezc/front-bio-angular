import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponsibleService } from 'src/app/services/processes/responsible.service';
import { StrawService } from 'src/app/services/processes/straw.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-sanitatings',
  templateUrl: './update-sanitatings.component.html',
  styleUrls: ['./update-sanitatings.component.scss'],
  providers: [DatePipe]
})
export class UpdateSanitatingsComponent {
  /*

  sanitatedBasketId = 0;
  sanitating: any = {};
  responsibles: any;
  strawTypes: any;

  constructor(private route:ActivatedRoute,
              private sanitatingService:SanitatingService,
              private responsibleService:ResponsibleService,
              private strawService:StrawService,
              private router:Router,
              private location:Location,
              private datePipe:DatePipe) { }

  ngOnInit(): void {
    this.sanitatedBasketId = this.route.snapshot.params['sanitatedBasketId'];
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
        alert('Error al cargar los tipos de bíombillas.')
      }
    )
    this.sanitatingService.getSanitating(this.sanitatedBasketId).subscribe(
      (data) => {
        this.sanitating = data;
        console.log(this.sanitating);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  public updateSanitating() {
    const wetWeight = parseFloat(this.sanitating.wetWeight);
    const afterWeight = parseFloat(this.sanitating.weightAfterDrying);
    const beforeWeight = parseFloat(this.sanitating.weightBeforeDrying);
    
    const weightGainPercentage = ((afterWeight - beforeWeight)/beforeWeight)*100;
    const waterRetentionPercentage = ((afterWeight - beforeWeight)/afterWeight)*100;

    const id = this.sanitating.sanitatedBasketId;
    Swal.fire({
      title: 'Confirmar actualización',
      text: `¿Estas seguro de que quieres actualizar la sanitización N° ${id}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, actualizar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.sanitating.date = this.datePipe.transform(this.sanitating.date, 'yyyy-MM-dd');
        this.sanitating.weightGainPercentage = weightGainPercentage.toFixed(2);
        this.sanitating.waterRetentionPercentage = waterRetentionPercentage.toFixed(2);
        this.sanitatingService.updateSanitating(this.sanitatedBasketId, this.sanitating).subscribe(
          (data) => {
            console.log(data);
            Swal.fire('Éxito', `La sanitización N° ${id} ha sido actualizada correctamente.`, 'success').then(() => {
              this.router.navigate(['admin/view-sanitatings']);
            });
    },
    (error) => {
      Swal.fire('Error', `La sanitización N° ${id} no ha podido ser actualizada`, 'error').then(
        (e) => {
          console.log(e);
          }
        );
      });
    }
  });
}

goBack(): void {
  this.location.back();
}

deleteSanitating(sanitatedBasketId:any) {
  const id = this.sanitating.sanitatedBasketId;
  Swal.fire({
    title: `Eliminar sanitización`,
    text: `¿Estas seguro que deseas eliminar la sanitización N° ${id}?`,
    icon: 'warning',
    showCancelButton:true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if(result.isConfirmed){
      this.sanitatingService.deleteSanitating(sanitatedBasketId).subscribe(
        (data) => {
          this.sanitating= {};
          Swal.fire({
            title: 'Éxito',
            text: `La sanitización N° ${id} ha sido eliminada correctamente.`,
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['admin/view-orders']);
          });
        },
        (error) => {
          Swal.fire('Error', `Error al eliminar la sanitización N° ${id}.`, 'error');
        }
      )
    }
  })
}

*/

}
