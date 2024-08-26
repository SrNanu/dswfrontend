import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Persona } from '../../interfaces/persona';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AgregarEditarPersonaComponent } from '../agregar-editar-persona/agregar-editar-persona.component';
import { PersonaService } from '../../services/persona.service';
import { MatSnackBar } from '@angular/material/snack-bar';





@Component({
  selector: 'app-list-personas',
  templateUrl: './list-personas.component.html',
  styleUrl: './list-personas.component.css'
})
export class ListPersonasComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'correo', 'tipodocumento', 'documento', 'fechanacimiento', "acciones"];
  dataSource: MatTableDataSource<Persona>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private _personaService: PersonaService, private _snackBar :MatSnackBar) {
    
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.obtenerPersonas(); 
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  obtenerPersonas(){
    this._personaService.getPersonas().subscribe(data => {
      console.log('Data recibida del backend:', data ); // Debería mostrar los datos correctos
      this.dataSource.data = data;
      console.log('DataSource data:', this.dataSource.data); // Debería mostrar los mismos datos que el log anterior
      this.dataSource.paginator = this.paginator;
      
      this.dataSource.sort = this.sort;}, error => {
        console.error('Error al obtener personas:', error);
      
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

  addEditPersona(){
    const dialogRef = this.dialog.open(AgregarEditarPersonaComponent, {
      width: '550px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result){
        this.obtenerPersonas();
      }
    });

  }

  deleteSecretary(id: number){
    this._personaService.deletePersona(id).subscribe(data => {
      this.obtenerPersonas();
      this.successMessage();
    }, error => {
      console.error('Error al eliminar persona:', error);
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
