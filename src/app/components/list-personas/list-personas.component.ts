import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Persona } from '../../interfaces/persona';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AgregarEditarPersonaComponent } from '../agregar-editar-persona/agregar-editar-persona.component';



const listPersonas: Persona[] = [
  { nombre: "Juan", apellido: "Fiele", correo: "juanfiele2002@gmail.com", tipoDocumento:"DNI", documento:43768000, fechaNacimiento:new Date() },
];

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
  constructor(public dialog: MatDialog){
    this.dataSource = new MatTableDataSource(listPersonas);
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.itemsPerPageLabel = "Items por pagina"
    this.dataSource.sort = this.sort;
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
    });

  }

}
