import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SanitizedBoxService } from 'src/app/services/sanitized/sanitized-box.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-drying',
  templateUrl: './add-drying.component.html',
  styleUrls: ['./add-drying.component.scss']
})
export class AddDryingComponent  {

  sanitizedBoxId: any;
  sanitizedBox: any = {};

  constructor(private route:ActivatedRoute,
              private sanitizedService:SanitizedBoxService,
              private router:Router,
              private location:Location,
              private snack:MatSnackBar,
              private cdr:ChangeDetectorRef,
              private dialogRef: MatDialogRef<AddDryingComponent>,
              @Inject(MAT_DIALOG_DATA) private data:any) { }

    ngOnInit(): void {
      this.sanitizedBox = {...this.sanitizedBox};
      this.sanitizedBoxId = this.data.sanitizedBoxId;
      this.sanitizedService.getSanitizedBox(this.sanitizedBoxId).subscribe(
        (data:any) => {
          this.sanitizedBox = data;
          console.log(this.sanitizedBox);
          this.cdr.detectChanges();        },
        (error) => {
          console.log(error);
        });
    }

    updateSanitized() {
      const weight = this.sanitizedBox.weightAfterDrying;
      const afterWeight = parseFloat(this.sanitizedBox.weightAfterDrying);
      const beforeWeight = parseFloat(this.sanitizedBox.weightBeforeDrying);
    
      const weightGainPercentage = ((afterWeight - beforeWeight)/beforeWeight)*100;
      const waterRetentionPercentage = ((afterWeight - beforeWeight)/afterWeight)*100;
      const id = this.sanitizedBox.sanitizedBoxId;
      this.sanitizedBox = {...this.sanitizedBox};
      const requiredFields: Array<keyof typeof this.sanitizedBox> = ['weightAfterDrying'];
      const fieldNames = {
        weightAfterDrying: 'peso despues del secado'
      }
      for (const field of requiredFields) {
        if (!this.sanitizedBox[field] || (typeof this.sanitizedBox[field] === 'string' && this.sanitizedBox[field].trim() === '')) {
          this.snack.open('El campo ' + fieldNames[field] + ' es requerido.', 'Aceptar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right'
          });
          return;
        }
      }
      Swal.fire({
        title: 'Confirmación',
        text: `¿Estás seguro de que quieres agregar ${weight}kg como peso despues del secado?.`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, guardar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.sanitizedBox.state = true;
          this.sanitizedBox.weightGainPercentage = weightGainPercentage.toFixed(2);
        this.sanitizedBox.waterRetentionPercentage = waterRetentionPercentage.toFixed(2);
          this.sanitizedService.updateSanitizedBox( this.sanitizedBoxId, this.sanitizedBox).subscribe(
            (data) => {
              console.log(data);
              Swal.fire('Éxito', `Han sido agregados ${weight}kg como peso despues del secado`, 'success').then(() => {
                this.dialogRef.close();
                this.cdr.detectChanges();
              });
            },
            (error) => {
              Swal.fire('Error', 'El peso despues de secado no ha sido guardado', 'error').then(
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

    

  }

