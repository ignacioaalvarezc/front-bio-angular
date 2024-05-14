import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BoxTypeService } from 'src/app/services/packing/box-type.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-box',
  templateUrl: './update-box.component.html',
  styleUrls: ['./update-box.component.scss']
})
export class UpdateBoxComponent implements OnInit{

  boxTypeId: any;;
  boxType: any = {};

  constructor(private route:ActivatedRoute,
              private boxTypeService:BoxTypeService,
              private router:Router,
              private location:Location) { }

ngOnInit(): void {
  this.boxTypeId = this.route.snapshot.paramMap.get('boxTypeId');
  this.boxType = {
    name: '',
    provider: '',
    format: '',
    strawAmount: '',
    description: ''
  }
  this.boxTypeService.getBoxType(this.boxTypeId).subscribe(
    (data:any) => {
      this.boxType = data;
      console.log(this.boxType);
      },
    (error) => {
      console.log(error);
      }
    )
  }

  updateBoxType() {
    Swal.fire({
      title: 'Confirmar actualización',
      text: '¿Estás seguro de que quieres actualizar este tipo de empaquetado?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, actualizar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.boxTypeService.updateBoxType(this.boxTypeId, this.boxType).subscribe(
          (data) => {
            console.log(data);
            Swal.fire('Éxito', 'El tipo de empaquetado ha sido actualizado con éxito', 'success').then(() => {
              this.router.navigate(['admin/view-boxTypes']);
            });
          },
          (error) => {
            Swal.fire('Error', 'El tipo de empaquetado no ha sido actualizado', 'error').then(
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

  toggleBoxStatus(boxTypeId: any, newStatus: boolean) {
    const actionText1 = newStatus ? 'desbloquear' : 'bloquear';
    const actionText2 = newStatus ? 'desbloqueado' : 'bloqueado';
  
    Swal.fire({
      title: `Confirmación`,
      text: `El tipo de empaquetado será ${actionText2} y no podrá ser asignado a ningún proceso.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.boxTypeService.toggleBoxTypeStatus(boxTypeId, newStatus).subscribe(
          () => {
            Swal.fire(`Éxito`, `El tipo de empaquetado ha sido ${actionText2} correctamente.`, 'success').then(() => {
              this.router.navigate(['admin/view-boxTypes']);
            });
          },
          (error) => {
            Swal.fire('Error de actualización', 'El tipo de empaquetado no ha sido actualizado', 'error').then(
              (e) => {
                console.log(e);
              }
            );
          }
        );
      }
    });
  }

  deleteBoxType(boxTypeId:any, name:any) {
    Swal.fire({
      title: `Eliminar tipo de empaquetado`,
      text: `¿Estas seguro que deseas eliminar el tipo ${name}?`,
      icon: 'warning',
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.boxTypeService.deleteBoxType(boxTypeId).subscribe(
          (data) => {
            this.boxType= {};
            Swal.fire({
              title: 'Éxito',
              text: `El tipo ${name} ha sido eliminado correctamente.`,
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              this.router.navigate(['admin/view-boxTypes']);
            });
          },
          (error) => {
            Swal.fire('Error', 'Error al eliminar el tipo de empaquetado.', 'error');
          }
        )
      }
    })
  }

}
