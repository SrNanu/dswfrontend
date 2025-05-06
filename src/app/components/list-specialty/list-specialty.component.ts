import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
<<<<<<< HEAD
import { Specialty } from '../../interfaces/specialty';
=======
import { Specialty } from '../../interfaces/specialty.js';
>>>>>>> upstream/master
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
<<<<<<< HEAD
import { AgregarEditarSpecialtyComponent } from '../agregar-editar-specialty/agregar-editar-specialty.component';
import { SpecialtyService } from '../../services/specialty.service';
=======
import { AgregarEditarSpecialtyComponent } from '../agregar-editar-specialty/agregar-editar-specialty.component.js';
import { SpecialtyService } from '../../services/specialty.service.js';
>>>>>>> upstream/master
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-specialty',
  templateUrl: './list-specialty.component.html',
  styleUrl: './list-specialty.component.css'
})

export class ListSpecialtyComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['code', 'name', 'acciones'];
  dataSource: MatTableDataSource<Specialty>;
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog
    , private _specialtyService: SpecialtyService
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
    this.obternerEspecialidades();
  }

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator._intl.itemsPerPageLabel = 'Items por página';
      this.dataSource.sort = this.sort;
  }

  obternerEspecialidades() {
    this.loading = true;
    this._specialtyService.getSpecialties().subscribe( data =>  {
      this.loading = false;
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addEditSpecialty(id?: number) {
    const dialogRef = this.dialog.open(AgregarEditarSpecialtyComponent, {
      width: '550px',
      disableClose: true,
      data: {id: id}
    });

      dialogRef.afterClosed().subscribe(result => {

        if(result) {
          this.obternerEspecialidades();
        }
      });
  }

  deleteSpecialty(id: number) {

  this._specialtyService.deleteSpecialty(id).subscribe(() => {
    this.obternerEspecialidades();
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
