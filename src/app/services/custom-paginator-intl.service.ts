import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class CustomPaginatorIntlService extends MatPaginatorIntl {
  
  override itemsPerPageLabel = 'Items por página';

}
