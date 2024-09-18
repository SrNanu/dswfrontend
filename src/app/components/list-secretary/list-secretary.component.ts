import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Secretary } from '../../interfaces/secretary';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AgregarEditarSecretaryComponent } from '../agregar-editar-secretary/agregar-editar-secretary.component';
import { SecretaryService } from '../../services/secretary.service';
import { MatSnackBar } from '@angular/material/snack-bar';





@Component({
  selector: 'app-list-secretary',
  templateUrl: './list-secretary.component.html',
  styleUrl: './list-secretary.component.css'
})
export class ListSecretarysComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'correo', 'tipodocumento', 'documento', 'fechanacimiento', "acciones"];
  dataSource: MatTableDataSource<Secretary>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private _secretaryService: SecretaryService, private _snackBar :MatSnackBar) {
    
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.obtenerSecretarys(); 
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  obtenerSecretarys(){
    this._secretaryService.getSecretarys().subscribe(data => {
      console.log('Data recibida del backend:', data ); // Debería mostrar los datos correctos
      this.dataSource.data = data;
      console.log('DataSource data:', this.dataSource.data); // Debería mostrar los mismos datos que el log anterior
      this.dataSource.paginator = this.paginator;
      
      this.dataSource.sort = this.sort;}, error => {
        console.error('Error al obtener secretarys:', error);
      
      /*this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator._intl.itemsPerPageLabel = "Items por pagina"
      this.dataSource.sort = this.sort;*/
    });

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addEditSecretary( id?:number){
    console.log('id:', id);
    const dialogRef = this.dialog.open(AgregarEditarSecretaryComponent, {
      width: '550px',
      disableClose: true,
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result){
        this.obtenerSecretarys();
      }
    });

  }

  deleteSecretary(id: number){
    this._secretaryService.deleteSecretary(id).subscribe(data => {
      this.obtenerSecretarys();
      this.successMessage();
    }, error => {
      console.error('Error al eliminar secretary:', error);
    });
  }
  successMessage(){
    this._snackBar.open('La secretaria fue eliminada con exito',"" ,{
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

}
