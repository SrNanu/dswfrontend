import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Patient } from '../../interfaces/patient.js';
import { Attention } from '../../interfaces/attention.js';
import { PatientService } from '../../services/patient.service.js';
import { throwError } from 'rxjs';
import { ModalDatosMedicosPacienteComponent } from './modal-datos-medicos-paciente.component.js';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { AttentionService } from '../../services/attentions.service.js';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { After } from 'v8';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-paciente-detalle',
  templateUrl: './hc-paciente.component.html',
  styleUrls: ['./hc-paciente.component.css']
})
export class HCPacienteComponent implements OnInit , AfterViewInit {
  patientInfo: { label: string, value: string }[] = [];
  attentionList: { date: string}[] = [];
  dni: string = '';
  doesntHaveAttentions = false;
  displayedColumns: string[] = ['date', 'reason', 'acciones'];
  dataSource: MatTableDataSource<Attention>;
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private _PatientService: PatientService,
    private _AttentionService: AttentionService ,
    private dialog: MatDialog,
    private _snackBar :MatSnackBar
    ) {
      this.dataSource = new MatTableDataSource();
    }

  ngOnInit(): void {
    this.dni = this.route.snapshot.paramMap.get('dni') || '';
    this.loadPatientData(this.dni);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadPatientData( dni : String ): void {

    this._PatientService.getPatientByDni(this.dni).subscribe(response => {
      if(response) //Look if a patient arrives (i mean its not null)
        {
          const patient = response;
            this.patientInfo = [
            { label: 'Nombre y Apellido', value: (patient.firstname + ' ' + patient.lastname) },
            { label: 'DNI', value: patient.dni },
            { label: 'Obra Social', value: patient.healthInsurance.name },
            { label: 'Fecha de Nacimiento', value:  patient.birthDate.toString() },
            { label: 'Grupo Sanguíneo', value: patient.grupoSanguineo },
            { label: 'Antecedentes Personales', value: patient.antecedentesPersonales },
            { label: 'Antecedentes Familiares', value: patient.antecedentesFamiliares },
            { label: 'Email', value: patient.email },
            { label: 'Teléfono', value: patient.phoneNumber },
            { label: 'Dirección', value: patient.address },
            ];
          //Check if medical data has been written on it
          if (!patient.grupoSanguineo || !patient.antecedentesPersonales || !patient.antecedentesFamiliares) {
            // If not, it will trigger the component or modal for medical data information

            const dialogRef = this.dialog.open(ModalDatosMedicosPacienteComponent, {
              width: '800px',
              data:  patient ,
            });

            dialogRef.afterClosed().subscribe(result => {
              // After the modal is closed, it will reload the patient data, and it will load its attentions
              if(result) {
                this.loadPatientData(this.dni);
                // TODO EVITAR EL AS NUMBER
                this.loadPatientAttentions(patient.id as number);
              }
            });

          }
          else {
            // If the patient has medical data, it will load its attentions
            // TODO EVITAR EL AS NUMBER
            this.loadPatientAttentions(patient.id as number);
          }
      }
      else
      {
          throwError('Error fetching patient data');
      }
    });

  }

  loadPatientAttentions(id : number): void {
    this.loading = true;
    this._AttentionService.getAttentionsByPatientId(id).subscribe(
      data =>{
      if (data && data.length > 0) { // here i check if data is valid and not empty
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      else{
        this.doesntHaveAttentions = true;
      }
      this.loading = false;
    },
    (error: HttpErrorResponse) => {
      this.loading = false;
      this.doesntHaveAttentions = true;
      if (error.status === 404) {
        console.warn('No attentions found for this patient:', error.message);
        // Optionally, display an alert or message to the user here
      } else {
        console.error('An error occurred:', error.message);
        // Handle other errors here, like displaying a generic error message
      }
    }

  );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addConsulta(){

  }

  editAttention( id?:number){
    // //console.log('id:', id);
    // const dialogRef = this.dialog.open(AgregarEditarPatientComponent, {
    //   width: '550px',
    //   disableClose: true,
    //   data: {id: id}
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   if(result){
    //     this.obtenerPatients();
    //   }
    // });

  }

  deleteAttention(id: number){
    // this._patientService.deletePatient(id).subscribe(data => {
    //   this.obtenerPatients();
    //   this.successMessage();
    // }, error => {
    //   console.error('Error al eliminar patient:', error);
    // });
  }
  successMessage(){
    this._snackBar.open('El paciente fue eliminada con exito',"" ,{
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }


}
