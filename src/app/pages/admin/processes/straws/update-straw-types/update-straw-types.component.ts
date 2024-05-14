import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { StrawService } from 'src/app/services/processes/straw.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-straw-types',
  templateUrl: './update-straw-types.component.html',
  styleUrls: ['./update-straw-types.component.scss']
})
export class UpdateStrawTypesComponent implements OnInit {

  strawTypeId: any;
  strawType: any = {};

  constructor(private route:ActivatedRoute,
              private strawService:StrawService,
              private router:Router,
              private location:Location,
              private snack:MatSnackBar,
              private cdr:ChangeDetectorRef,
              private dialogRef: MatDialogRef<UpdateStrawTypesComponent>,
              @Inject(MAT_DIALOG_DATA) private data:any) { }

  ngOnInit(): void {
    this.strawType = {...this.data};
    this.strawTypeId = this.data.strawTypeId;
    this.strawService.getStrawType(this.strawTypeId).subscribe(
      (data: any) => {
        this.strawType = data;
        console.log(this.strawType);
        this.cdr.detectChanges();
      },
      (error) => {
        console.log(error);
      });
  }

  updateStrawType() {
    const name = this.strawType.name;
    const requiredFields: Array<keyof typeof this.strawType> = ['name', 'description'];
    const fieldNames = {
      name: 'nombre',
      description: 'descripción'
    }
    
    for (const field of requiredFields) {
      if (!this.strawType[field] || (typeof this.strawType[field] === 'string' && this.strawType[field].trim() === '')) {
        this.snack.open('El campo ' + fieldNames[field] + ' es requerido.', 'Aceptar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
        return;
      }
    }
    Swal.fire({
      title: 'Confirmar actualización',
      text: `¿Estás seguro de que quieres actualizar el tipo de bíombilla ${name}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, actualizar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.strawService.updateStrawType(this.strawTypeId, this.strawType).subscribe(
          (data) => {
            console.log(data);
            Swal.fire('Éxito', `El tipo de bíombilla ${name} ha sido actualizado con éxito`, 'success').then(() => {
              this.dialogRef.close();
              this.cdr.detectChanges();
            });
          },
          (error) => {
            Swal.fire('Error de actualización', `El tipo de bíombilla ${name} no ha sido actualizado`, 'error').then(
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
    this.dialogRef.close();
  }  

  toggleStrawStatus(strawTypeId: any, newStatus: boolean, name: any) {
    const actionText1 = newStatus ? 'desbloquear' : 'bloquear';
    const actionText2 = newStatus ? 'desbloqueado' : 'bloqueado';
  
    Swal.fire({
      title: 'Cambio de estado',
      text: `¿Estás seguro de que quieres ${actionText1} el tipo de bíombilla ${name}?. No podra ser asignado a ningún proceso.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.strawService.toggleStrawTypeStatus(strawTypeId, newStatus).subscribe(
          () => {
            Swal.fire(`Éxito`, `El tipo de bíombilla ${name} ha sido ${actionText2} correctamente`, 'success').then(() => {
              this.dialogRef.close();
              
            });
          },
          (error) => {
            Swal.fire('Error', `El tipo de bíombilla ${name} no ha sido ${actionText2} correctamente.`, 'error').then(
              (e) => {
                console.log(e);
              }
            );
          }
        );
      }
    });
  }

  deleteStrawType(strawTypeId:any, name:any) {
    Swal.fire({
      title: `Eliminar tipo de bíombilla`,
      text: `¿Estas seguro que deseas eliminar el tipo ${name}?`,
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
            this.strawType= {};
            Swal.fire({
              title: `El tipo ${name} ha sido eliminado con éxito`,
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              this.router.navigate(['admin/view-strawTypes']);
            });
          },
          (error) => {
            Swal.fire('Error', 'Error al eliminar el responsable', 'error');
          }
        )
      }
    })
  }

}
