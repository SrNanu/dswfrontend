import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { Medic } from '../../interfaces/medic';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddEditMedicComponent } from '../add-edit-medic/add-edit-medic.component';
import { MedicService } from '../../services/medic.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Specialty } from '../../interfaces/specialty';
import { Router } from '@angular/router';  // Importar Router
import { DetalleMedicComponent } from '../detalle-medic/detalle-medic.component';


@Component({
  selector: 'app-list-medics',
  templateUrl: './list-medics.component.html',
  styleUrl: './list-medics.component.css',
})
export class ListMedicsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'dni',
    'firstname',
    'lastname',
    'medicalConsultationValue',
    'specialty',
    'acciones',
  ];
  dataSource: MatTableDataSource<Medic>;
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private _medicService: MedicService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource();

    // Se verifica dos veces porque el rol se guarda en store pero podria ser modificado
    // si solo se verificaria con el error del backend, carga por un mili segundo la pagina lo cual queda mal
    const userRole = localStorage.getItem('role');
    if (userRole !== 'secretary') {
      this.router.navigate(['/access-denied']);
    }
  }

  ngOnInit(): void {
    this.obtenerMedicos();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  obtenerMedicos() {
    this._medicService.getMedics().subscribe(
      (data) => {
        console.log('Data recibida del backend:', data);
        this.dataSource.data = data;
        //console.log('DataSource data:', this.dataSource.data);  Debería mostrar los mismos datos que el log anterior
        this.dataSource.paginator = this.paginator;

        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Error al obtener medicos:', error);
        // Verificar si el error es de acceso denegado
        if (error.status === 403 || error.status === 401) {
          // Redirigir al usuario a una página de error
          this.router.navigate(['/access-denied']);
        }
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = event ? (event.target as HTMLInputElement).value : '';
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  detalleMedic(id:string){
        const dialogRef = this.dialog.open(DetalleMedicComponent, {
          width: '550px',
          disableClose: true,
          data: { id: id }
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          if (result) {
            this.obtenerMedicos();
          }
        });
    
  }
  addEditMedic(id?: number) {
    console.log('id:', id);
    const dialogRef = this.dialog.open(AddEditMedicComponent, {
      width: '550px',
      disableClose: true,
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.obtenerMedicos();
      }
    });
  }

  deleteMedico(id: number) {
    this.loading = true;
    this._medicService.deleteMedico(id).subscribe((data) => {
      this.loading = false;
      this.obtenerMedicos();
      this.mensajeExito();
    });
  }

  mensajeExito() {
    this._snackBar.open('El medico fue eliminado con exito', '', {
      duration: 2000,
    });
  }
}

function mensajeExito() {
  throw new Error('Function not implemented.');
}

