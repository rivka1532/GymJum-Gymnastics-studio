import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ColDef, GridApi, GridReadyEvent, ColumnModel } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../services/data.service';
import { Registration } from '../models/registration.model';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  standalone: true,
  selector: 'app-registration',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatInputModule, FormsModule, AgGridAngular],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {
  registrations: Registration[] = [];
  private registrationsSubscription?: Subscription;
  constructor(private dialog: MatDialog, private dataService: DataService) { }


  paginationAutoPageSize = true;

  gridOptions = {
    enableRtl: true,
    suppressHorizontalScroll: false,
    getRowStyle: (params: any) => {
      if (!params.data.paid) {
        return { background: '#f1faff' };  // אדום בהיר 
      } else {
        return { background: 'none' };  // ירוק בהיר
      }
    }
  }

  colDefs: ColDef[] = [
    { field: 'firstName', headerName: 'שם פרטי', width: 150, filter: 'agTextColumnFilter' },
    { field: 'lastName', headerName: 'שם משפחה', width: 150, filter: 'agTextColumnFilter' },
    { field: 'phone', headerName: 'טלפון', width: 150, filter: 'agTextColumnFilter' },
    { field: 'idNumber', headerName: 'מספר זהות', width: 150, filter: 'agTextColumnFilter' },
    { field: 'lesson', headerName: 'שיעור', width: 150, filter: 'agTextColumnFilter' },
    { field: 'price', headerName: 'מחיר', width: 150, filter: 'agNumberColumnFilter' },
    { field: 'paid', headerName: 'האם שולם', width: 150, editable: true, filter: 'agBooleanColumnFilter', },
    {
      headerName: 'פרטים',
      cellRenderer: (params: any) => {
        const button = document.createElement('button');
        button.innerText = 'פרטים';
        button.style.backgroundColor = '#64b5f6';  // כחול תכלת בהיר כמו הכותרת
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.padding = '6px 14px';
        button.style.borderRadius = '20px';  // קצוות מעוגלים
        button.style.cursor = 'pointer';
        button.style.fontSize = '14px';
        button.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        button.style.transition = 'background-color 0.3s ease';
        button.addEventListener('mouseover', () => {
          button.style.backgroundColor = '#42a5f5';  // גוון קצת כהה יותר במעבר עכבר
        });
        button.addEventListener('mouseout', () => {
          button.style.backgroundColor = '#64b5f6';  // חזרה לצבע המקורי
        });
        button.addEventListener('click', () => {
          this.showDetails(params.data);
        });
        return button;
      }
    }
  ];

  rowData = this.registrations; // נתוני השורות
  // rowData = [
  //   { firstName: 'נועה', lastName: 'שגב', phone: '052-4960499', idNumber: '978857510', lesson: 'יוגה למתחילים', price: 300, paid: true },
  //   { firstName: 'אור', lastName: 'אביטל', phone: '050-6225749', idNumber: '425419340', lesson: 'חיטוב ועיצוב הגוף', price: 450, paid: false },
  //   { firstName: 'מאיה', lastName: 'אליהו', phone: '058-7571059', idNumber: '970316772', lesson: 'יוגה למתחילים', price: 300, paid: true },
  //   { firstName: 'נועה', lastName: 'שגב', phone: '054-6967309', idNumber: '818419525', lesson: 'יוגה למתחילים', price: 300, paid: true },
  //   { firstName: 'רותם', lastName: 'אליהו', phone: '058-6976031', idNumber: '403524540', lesson: 'חיטוב ועיצוב הגוף', price: 450, paid: false },
  //   { firstName: 'ליטל', lastName: 'שמרון', phone: '052-6385105', idNumber: '670200252', lesson: 'פילאטיס למתקדמים', price: 400, paid: true },
  //   { firstName: 'תמר', lastName: 'בן-שמשון', phone: '058-5791625', idNumber: '285685825', lesson: 'חיזוק עמוד שדרה', price: 250, paid: false },
  //   { firstName: 'איילת', lastName: 'אליהו', phone: '058-8007688', idNumber: '711245753', lesson: 'פילאטיס למתקדמים', price: 400, paid: false },
  //   { firstName: 'אלונה', lastName: 'מלכה', phone: '054-9432185', idNumber: '576265988', lesson: 'חיטוב ועיצוב הגוף', price: 450, paid: false },
  //   { firstName: 'תמר', lastName: 'תמרי', phone: '054-8710713', idNumber: '727329426', lesson: 'זומבה עם אנרגיה', price: 300, paid: false },
  //   { firstName: 'גל', lastName: 'רוזנבלום', phone: '050-7260330', idNumber: '958023779', lesson: 'יוגה למתחילים', price: 300, paid: true },
  //   { firstName: 'רותם', lastName: 'זוהר', phone: '050-9824116', idNumber: '827394888', lesson: 'פילאטיס למתקדמים', price: 400, paid: true },
  //   { firstName: 'אורנה', lastName: 'ברק', phone: '054-8201039', idNumber: '387602366', lesson: 'זומבה עם אנרגיה', price: 300, paid: false },
  //   { firstName: 'ליטל', lastName: 'כהן', phone: '050-5294123', idNumber: '796559495', lesson: 'חיטוב ועיצוב הגוף', price: 450, paid: false },
  //   { firstName: 'רות', lastName: 'דוד', phone: '050-1358918', idNumber: '226935396', lesson: 'חיזוק עמוד שדרה', price: 250, paid: true },
  //   { firstName: 'רחל', lastName: 'גולדשטיין', phone: '058-9518118', idNumber: '351376100', lesson: 'חיזוק עמוד שדרה', price: 250, paid: true },
  //   { firstName: 'גל', lastName: 'דוד', phone: '054-5192526', idNumber: '300983486', lesson: 'זומבה עם אנרגיה', price: 300, paid: false },
  //   { firstName: 'רחל', lastName: 'לוי', phone: '058-1388195', idNumber: '493708053', lesson: 'יוגה למתחילים', price: 300, paid: true },
  //   { firstName: 'ענבר', lastName: 'אביטל', phone: '054-3467572', idNumber: '026571819', lesson: 'פילאטיס למתקדמים', price: 400, paid: true },
  //   { firstName: 'אור', lastName: 'בן-שמשון', phone: '058-6424216', idNumber: '749877313', lesson: 'חיטוב ועיצוב הגוף', price: 450, paid: false },
  //   { firstName: 'רותם', lastName: 'ברק', phone: '050-1857373', idNumber: '499102196', lesson: 'זומבה עם אנרגיה', price: 300, paid: false },
  //   { firstName: 'אורית', lastName: 'תמרי', phone: '058-8821252', idNumber: '619652926', lesson: 'חיטוב ועיצוב הגוף', price: 450, paid: true },
  //   { firstName: 'אור', lastName: 'לוי', phone: '052-8648153', idNumber: '680586690', lesson: 'יוגה למתחילים', price: 300, paid: true },
  //   { firstName: 'איילת', lastName: 'זוהר', phone: '050-9059129', idNumber: '200649252', lesson: 'חיטוב ועיצוב הגוף', price: 450, paid: true },
  //   { firstName: 'מיה', lastName: 'מלכה', phone: '050-3781070', idNumber: '718855322', lesson: 'חיטוב ועיצוב הגוף', price: 450, paid: false },
  //   { firstName: 'אלונה', lastName: 'אליהו', phone: '058-4373326', idNumber: '835421172', lesson: 'חיזוק עמוד שדרה', price: 250, paid: false },
  //   { firstName: 'רותם', lastName: 'בן-שמשון', phone: '054-5929720', idNumber: '162016684', lesson: 'חיטוב ועיצוב הגוף', price: 450, paid: true }
  // ];
  // registrants = this.rowData;

  ngOnInit() {
    this.registrationsSubscription = this.dataService.registrations$.subscribe(registrations => {
      this.registrations = registrations;
    })
  }

  gridApi!: GridApi;
  gridWidth: number = 0;

  onGridReady(params: GridReadyEvent<any>) {
    params.api.sizeColumnsToFit();
    this.gridApi = params.api;

    // Auto-size columns
    const allColumnIds: string[] = [];
    this.gridApi.getColumns()?.forEach(column => {
      allColumnIds.push(column.getId());
    });
    this.gridApi.autoSizeColumns(allColumnIds);

    // Calculate total width of columns
    let totalWidth = 0;
    this.gridApi.getColumns()?.forEach(column => {
      totalWidth += column.getActualWidth();
    });

    this.gridWidth = totalWidth;
  }

  showDetails(rowData: any) {
    this.dialog.open(DetailsDialogComponent, {
      data: rowData
    });
  }

}
