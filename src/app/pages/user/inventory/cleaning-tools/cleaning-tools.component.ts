import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, finalize } from 'rxjs';
import { CleaningTool } from 'src/app/models/item/cleaningTool';
import { CleaningToolsService } from 'src/app/services/item/cleaning-tools.service';
import Swal from 'sweetalert2';
import { UpdateCleaningToolComponent } from './update-cleaning-tool/update-cleaning-tool.component';

@Component({
  selector: 'app-cleaning-tools',
  templateUrl: './cleaning-tools.component.html',
  styleUrls: ['./cleaning-tools.component.scss']
})
export class CleaningToolsComponent implements OnInit {
  cleaningTools: any = [] = [];
  columns: string[] = ['cleaningToolId', 'name', 'amount'];
  dataSource: any; 
  clickedRows = new Set<CleaningTool>();
  hoveredRows = new Set<CleaningTool>();





  constructor(private toolService:CleaningToolsService,
              private location:Location,
              private dialog:MatDialog) { }

  ngOnInit(): void {
    this.loadCleaningTools();
  }

  navigateToUpdateCleaningTool(cleaningTool: CleaningTool): void {
    const dialogRef = this.dialog.open(UpdateCleaningToolComponent, {
      width: '600px',
      height: '500px',
      data: cleaningTool
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadCleaningTools();
    })
  }

  onRowMouseEnter(row: CleaningTool): void {
    this.hoveredRows.add(row);
  }

  onRowMouseLeave(row: CleaningTool): void {
    this.hoveredRows.delete(row);
  }

  loadCleaningTools() {
    this.toolService.listCleaningTools().pipe(
      catchError((error) => {
        Swal.fire({
          title: 'Error',
          text: 'Error al cargar los articulos de limpieza',
          icon: 'error'});
          throw error;
        }),
        finalize(() => {

        })
      ).subscribe((data:any) => {
        this.dataSource = new MatTableDataSource<any>(data);
      });
  }

  goBack() {
    this.location.back();
  }

}
