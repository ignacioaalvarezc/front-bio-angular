import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BoxTypeService } from 'src/app/services/packing/box-type.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-box',
  templateUrl: './add-box.component.html',
  styleUrls: ['./add-box.component.scss']
})
export class AddBoxComponent {

  constructor(private boxTypeService:BoxTypeService,
    private snack:MatSnackBar,
    private location:Location,
    private router:Router) { }


    boxTypeData = {
      boxTypeId: '',
      name: '',
      provider: '',
      format: '',
      strawAmount: '',
      description: '',
    }

    ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

  saveBoxType() {
    Swal.fire({
      title: 'Confirmar registro',
      text: `Estas seguro de que quieres registrar este tipo de empaquetado?.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Registrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
        this.boxTypeService.addBoxType(this.boxTypeData).subscribe(
        (data) => {
          console.log(data);
          Swal.fire('Éxito', 'El tipo de empaquetado ha sido guardado correctamente', 'success');
          this.boxTypeData = {
            boxTypeId: '',
            name: '',
            provider: '',
            format: '',
            strawAmount: '',
            description: '',
          };
          this.router.navigate(['/admin/view-boxTypes/'])
        },
        (error) => {
          Swal.fire('Error', 'Error al registrar el tipo de empaquetado', 'error');
          }
        )
    })
  }
}

