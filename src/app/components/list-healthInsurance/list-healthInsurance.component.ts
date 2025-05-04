import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Specialty } from '../../interfaces/specialty';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AgregarEditarHealthInsuranceComponent } from '../agregar-editar-healthInsurance/agregar-editar-healthInsurance.component';
import { HealthInsuranceService } from '../../services/healthInsurance.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HealthInsurance } from '../../interfaces/healthInsurance';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-healthInsurance',
  templateUrl: './list-healthInsurance.component.html',
  styleUrl: './list-healthInsurance.component.css'
})

export class ListHealthInsuranceComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'acciones'];
  dataSource: MatTableDataSource<HealthInsurance>;
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog
    , private _healthInsuranceService: HealthInsuranceService
    , private _snackBar :MatSnackBar
    , private router: Router) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
    // Se verifica dos veces porque el rol se guarda en store pero podria ser modificado
    // si solo se verificaria con el error del backend, carga por un mili segundo la pagina lo cual queda mal
    const userRole = localStorage.getItem('role');  
    if (userRole !== 'secretary') {  
      this.router.navigate(['/access-denied']);
    }
   }

  ngOnInit(): void {
    this.obternerObrasSociales();
  }

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator._intl.itemsPerPageLabel = 'Items por página';
      this.dataSource.sort = this.sort;
  }

  obternerObrasSociales() {
    this.loading = true;
    this._healthInsuranceService.getHealthInsurances().subscribe( data =>  {
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

  addEditHealthInsurance(id?: number) {
    const dialogRef = this.dialog.open(AgregarEditarHealthInsuranceComponent, {
      width: '550px',
      disableClose: true,
      data: {id: id}
    });

      dialogRef.afterClosed().subscribe(result => {

        if(result) {
          this.obternerObrasSociales();
        }
      });
  }

  deleteHealthInsurance(id: number) {

  this._healthInsuranceService.deleteHealthInsurance(id).subscribe(() => {
    this.obternerObrasSociales();
    this.successMessage();
  });
  }


  successMessage(){
    this._snackBar.open('La Obra Social fue eliminada con exito',"" ,{
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

}
