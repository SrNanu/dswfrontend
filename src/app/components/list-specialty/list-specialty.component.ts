import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Specialty } from '../../interfaces/specialty.js';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AgregarEditarSpecialtyComponent } from '../agregar-editar-specialty/agregar-editar-specialty.component.js';
import { SpecialtyService } from '../../services/specialty.service.js';
import { MatSnackBar } from '@angular/material/snack-bar';



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

  constructor(public dialog: MatDialog, private _specialtyService: SpecialtyService, private _snackBar :MatSnackBar) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
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
