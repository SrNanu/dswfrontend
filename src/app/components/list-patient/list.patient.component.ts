import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Patient } from '../../interfaces/patient';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AgregarEditarPatientComponent } from '../agregar-editar-paciente/agregar-editar-paciente.component';
import { PatientService } from '../../services/patient.service';
import { MatSnackBar } from '@angular/material/snack-bar';





@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrl: './list-patient.component.css'
})
export class ListPatientsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['firstname', 'lastname','dni', 'phoneNumber', 'address', 'email', 'birthDate', 'healthInsurance', "acciones"];
  dataSource: MatTableDataSource<Patient>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private _patientService: PatientService, private _snackBar :MatSnackBar) {

    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.obtenerPatients();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  obtenerPatients(){
    this._patientService.getPatients().subscribe(data => {
      //console.log('Data recibida del backend:', data );  Debería mostrar los datos correctos
      this.dataSource.data = data;
      //console.log('DataSource data:', this.dataSource.data);  Debería mostrar los mismos datos que el log anterior
      this.dataSource.paginator = this.paginator;

      this.dataSource.sort = this.sort;}, error => {
        console.error('Error al obtener patients:', error);

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

  addEditPatient( id?:number){
    //console.log('id:', id);
    const dialogRef = this.dialog.open(AgregarEditarPatientComponent, {
      width: '550px',
      disableClose: true,
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result){
        this.obtenerPatients();
      }
    });

  }

  deletePatient(id: number){
    this._patientService.deletePatient(id).subscribe(data => {
      this.obtenerPatients();
      this.successMessage();
    }, error => {
      console.error('Error al eliminar patient:', error);
    });
  }
  successMessage(){
    this._snackBar.open('El paciente fue eliminada con exito',"" ,{
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

}
