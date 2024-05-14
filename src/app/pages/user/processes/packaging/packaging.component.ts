import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Package } from 'src/app/models/packaging/package';
import { BoxTypeService } from 'src/app/services/packing/box-type.service';
import { PackageService } from 'src/app/services/packing/package.service';
import { PackagingService } from 'src/app/services/packing/packaging.service';
import { ResponsibleService } from 'src/app/services/processes/responsible.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-packaging',
  templateUrl: './packaging.component.html',
  styleUrls: ['./packaging.component.scss'],
  providers: [DatePipe]
})
export class PackagingComponent implements OnInit {
  selectedHour: string ='00:00';
  packageData: Package = {
    packageId: 0,
    packaging: { packagingId: 0 },
    boxType: { boxTypeId: 0 },
    responsible: { responsibleId: 0 },
    date: new Date(),
    filterDate: new Date(),
    hour: new Date(),
    boxAmount: null,
    strawAmount: null,
    weightRejected: null,
    strawRejected: null,
  };

  packages: any[] = [];

  constructor(private responsibleService:ResponsibleService,
    private packagingService:PackagingService,
    private packageService:PackageService,
    private boxTypeService:BoxTypeService,
    private snack:MatSnackBar,
    private location:Location,
    private router:Router,
    private datePipe:DatePipe) { }

    selectedDate: Date = new Date();
    selectedProvider: string;
    selectedName: string;
    filteredNames: any[] = [];
    filteredFormats: any[] = [];
    selectedFormat: string;
    newId: string;
    responsibles:any = [];
    boxTypes: any = [];
    packagings: any = [];
    packagingData = {
      packagingId: '',
      responsible: { responsibleId: 0 },
      date: '',
      endTime: null,
      startTime: null,
      totalHours: 0,
  }
  ngOnInit(): void {
    this.generateUniqueId();
    this.loadResponsibles();
    this.loadBoxTypes();
  }

  private padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  generateUniqueId() {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = this.padZero(now.getMonth() + 1);
    const day = this.padZero(now.getDate());
    const hours = this.padZero(now.getHours());
    const minutes = this.padZero(now.getMinutes());
    this.newId = `${year}${month}${day}${hours}${minutes}`;
    this.packagingData.packagingId = this.newId;
}

onProviderSelected() {
  this.filteredNames = this.boxTypes.filter(boxType => boxType.provider === this.selectedProvider).map(boxType => boxType.name);
}

onNameSelected() {
  this.filteredFormats = this.boxTypes.filter(boxType => boxType.name === this.selectedName).map(boxType => boxType.format);
}

  goBack(): void {
    this.location.back();
  }


   // FORMATEO DE FECHA
   formatInitDate(): void {
    this.selectedDate = new Date();
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();
    this.selectedHour = `${currentHour < 10 ? '0' : ''}${currentHour}:${currentMinute < 10 ? '0' : ''}${currentMinute}`;
  }

  // FORMATEO DE FECHA AL GUARDAR
  formatSaveDate(): void {
    const selectedDateWithTime = new Date(this.selectedDate);
        selectedDateWithTime.setHours(Number(this.selectedHour.split(':')[0]));
        selectedDateWithTime.setMinutes(Number(this.selectedHour.split(':')[1]));
        selectedDateWithTime.setMinutes(selectedDateWithTime.getMinutes() - selectedDateWithTime.getTimezoneOffset());
        if (isNaN(selectedDateWithTime.getTime())) {
          console.error('La fecha no es válida');
          return;
        }
        const newDate = new Date(selectedDateWithTime);
        newDate.setDate(newDate.getDate());
        this.packagingData.date = newDate.toISOString().split('T')[0];
        this.packagingData.startTime = this.selectedHour;
  }

  // GET THE OPERATORS
  loadResponsibles() {
    this.responsibleService.listResponsibles().subscribe(
      (data:any) => {
        this.responsibles = data;
      }, (error) => {
        console.log(error);
        Swal.fire({
          title: 'Error', 
          text: 'Error al cargar los responsables', 
          icon: 'error'
        });
      }
    );
  }

  // GET THE BOX TYPES
  loadBoxTypes() {
    this.boxTypeService.listBoxTypes().subscribe(
      (data:any) => {
        this.boxTypes = data;
      }, (error) => {
        console.log(error);
        Swal.fire({
          title: 'Error', 
          text: 'Error al cargar los tipos de estuche.', 
          icon: 'error'
        });
      }
    );
  }

  calculateTotalHours(startTime: string, endTime: string): number {
    const startTimeParts = startTime.split(':').map(part => parseInt(part, 10));
    const endTimeParts = endTime.split(':').map(part => parseInt(part, 10));
    const startMinutes = startTimeParts[0] * 60 + startTimeParts[1];
    const endMinutes = endTimeParts[0] * 60 + endTimeParts[1];
    const totalMinutes = endMinutes - startMinutes;
  
    const totalHours = totalMinutes / 60;
    return totalHours;
  }

  addObject() {
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();
  
    // CREATE 3 CUT BOXES
    const packageBox = {
      date: this.packageData.date,
      filterDate: this.packageData.date,
      hour: `${currentHour < 10 ? '0' : ''}${currentHour}:${currentMinute < 10 ? '0' : ''}${currentMinute}`,
      boxType: { ...this.packageData.boxType },
      packaging: this.packagingData.packagingId,
      responsible: this.packageData.responsible,
      boxAmount: this.packageData.boxAmount,
      strawAmount: this.packageData.strawAmount,
      weightRejected: this.packageData.weightRejected,
      strawRejected: this.packageData.strawRejected,
    };

    this.packages.push(packageBox);
    
  }

  removePackage(index: number) {
    this.packages.splice(index, 1);
  }

  savePackage(packageData: any) {
    this.packageService.saveAllPackages(this.packages).subscribe(
      (data) => {
        this.packageData = (packageData);
        Swal.fire({
          title: 'Éxito',
          text: 'Estuches registrados correctamente.',
          icon: 'success'});
      },
      (error) => {
        Swal.fire({
          title: 'Error',
          text: 'Error al registrar los estuches empaquetados.',
          icon: 'error'});
      });
  }

  savePackaging() {
    Swal.fire({
      title: 'Confirmar registro',
      text: `Estas seguro de que quieres registrar este empaquetado?.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Registrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if(result.isConfirmed) {
        this.formatSaveDate();
        this.packagingData.date = this.datePipe.transform(this.packagingData.date, 'yyyy-MM-dd');
        // GET THE GENERATED ID TO CUTTING ID
        this.packagingData.packagingId = this.newId;
        this.packagingData.responsible = this.packageData.responsible;
        // GET CURRENT TIME TO END TIME
        const currentHour = new Date().getHours();
        const currentMinute = new Date().getMinutes();
        const endTime = `${currentHour < 10 ? '0' : ''}${currentHour}:${currentMinute < 10 ? '0' : ''}${currentMinute}`;
        this.packagingData.endTime = endTime;
        // CALCULATE TOTAL HOURS BETWEEN START HOOUR AND END HOUR
        this.packagingData.totalHours = this.calculateTotalHours(this.packagingData.startTime, endTime);
        // SAVES THE PACKAGING DATA OBJECT
        this.packagingService.savePackaging(this.packagingData).subscribe(
        (packagingId: number) => {
          this.packages.forEach((pack) => {
            pack.packaging = packagingId;
          });
          this.savePackage(this.packageData);
        },
        (error) => {
          Swal.fire({
            title: 'Éxito', 
            text: 'El empaquetado ha sido guardado correctamente', 
            icon: 'success'});
        });
      }
    });
  }
}
