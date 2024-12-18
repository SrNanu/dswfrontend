import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ConsultationHours } from '../../interfaces/consultationHours.js';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AgregarEditarConsultationHoursComponent } from '../agregar-editar-consultationHours/agregar-editar-consultationHours.component.js';
import { ConsultationHoursService } from '../../services/consultationHours.service.js';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-consultationHours',
  templateUrl: './list-consultationHours.component.html',
  styleUrl: './list-consultationHours.component.css'
})

export class ListConsultationHoursComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['day','startTime', 'endTime', 'medic', 'acciones'];
  dataSource: MatTableDataSource<ConsultationHours>;
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog
    , private _consultationHours: ConsultationHoursService
    , private _snackBar :MatSnackBar
    , private router: Router) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
    // Se verifica dos veces porque el rol se guarda en store pero podria ser modificado
    // si solo se verificaria con el error del backend, carga por un mili segundo la pagina lo cual queda mal
    const userRole = localStorage.getItem('role');  
    if (userRole !== 'secretaria') {  
      this.router.navigate(['/access-denied']);
    }
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
    }, error => {
      console.error('Error al obtener obra social:', error);
      // Verificar si el error es de acceso denegado
      if (error.status === 403 || error.status === 401) {
        // Redirigir al usuario a una página de error 
        this.router.navigate(['/access-denied']); 
      }
    });
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
    this._snackBar.open('La hora de consulta fue eliminada con exito',"" ,{
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

}
