import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ConsultationHours } from '../../interfaces/consultationHours.js';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AgregarEditarConsultationHoursComponent } from '../agregar-editar-consultationHours/agregar-editar-consultationHours.component.js';
import { ConsultationHoursService } from '../../services/consultationHours.service.js';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-list-consultationHours',
  templateUrl: './list-consultationHours.component.html',
  styleUrl: './list-consultationHours.component.css'
})

export class ListConsultationHoursComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['day','startTime', 'endTime', 'acciones'];
  dataSource: MatTableDataSource<ConsultationHours>;
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private _consultationHours: ConsultationHoursService, private _snackBar :MatSnackBar) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
   }

  ngOnInit(): void {
    this.obternerConsultationHours();
  }

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator._intl.itemsPerPageLabel = 'Items por página';
      this.dataSource.sort = this.sort;
  }

  obternerConsultationHours() {
    this.loading = true;
    this._consultationHours.getAllConsultationHours().subscribe( data =>  {
      this.loading = false;
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    console.log(this.dataSource);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addEditConsultationHours(id?: number) {
    const dialogRef = this.dialog.open(AgregarEditarConsultationHoursComponent, {
      width: '550px',
      disableClose: true,
      data: {id: id}
    });

      dialogRef.afterClosed().subscribe(result => {

        if(result) {
          this.obternerConsultationHours();
        }
      });
  }

  deleteConsultationHours(id: number) {

  this._consultationHours.deleteConsultationHours(id).subscribe(() => {
    this.obternerConsultationHours();
    this.successMessage();
  });
  }


  successMessage(){
    this._snackBar.open('La especialidad fue eliminada con exito',"" ,{
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

}
