import { DatePipe, Location } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponsibleService } from 'src/app/services/processes/responsible.service';
import { StrawService } from 'src/app/services/processes/straw.service';
import { SanitizedService } from 'src/app/services/sanitized/sanitized.service';
import Swal from 'sweetalert2';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { AddDryingComponent } from './add-drying/add-drying.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { catchError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateParametersComponent } from 'src/app/pages/admin/processes/parameters/update-parameters/update-parameters.component';
import { SanitizedBoxService } from 'src/app/services/sanitized/sanitized-box.service';
import { SanitizedBox } from 'src/app/models/sanitized/sanitized-box';

@Component({
  selector: 'app-drying',
  templateUrl: './drying.component.html',
  styleUrls: ['./drying.component.scss'],
  providers: [DatePipe]

})
export class DryingComponent implements OnInit {

  selectedHour: string = '00:00';

  sanitizedBoxes: any = [] = [];
  sanitizedBoxId: any;
  responsibles: any = [] = [];
  strawTypes: any = [] = [];
  dataSource: any;

  constructor(private route:ActivatedRoute,
              private sanitizedService:SanitizedService,
              private sanitizedBoxService:SanitizedBoxService,
              private responsibleService:ResponsibleService,
              private router:Router,
              private strawService:StrawService,
              private location:Location,
              private dialog:MatDialog,
              private snack:MatSnackBar,
              private cdr:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadSanitizedBoxes();
  }

  loadSanitizedBoxes() {
    this.sanitizedBoxService.listSanitizedBoxes().subscribe(
      (data:any) => {
        this.sanitizedBoxes = data.filter((item:any) => item.state !== undefined && item.state === false);
        console.log(this.sanitizedBoxes);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar los lotes de secado.', 'error');
      }
    )
    
  }

  
  navigateToAddDrying(sanitizedBox: SanitizedBox): void {
    const dialogRef = this.dialog.open(AddDryingComponent, {
      width: '500px',
      height: '400px',
      data: sanitizedBox
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadSanitizedBoxes();
    })
  }

  /*
  public updateSanitating() {
    this.sanitatingService.updateSanitating(this.sanitatedBasket).subscribe(
      (data) => {
        Swal.fire(`Proceso actualizado`, 'El proceso', 'success').then(
          (e) => {
            this.router.navigate(['/admin/']);
          }
        );
      },
      (error) => {
        Swal.fire('Error en el sistema', 'No se ha podido actualizar el exámen', 'error');
        console.log(error);
      }
    )
  }
  */

}
