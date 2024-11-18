import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Patient } from '../../interfaces/patient';
import { PatientService } from '../../services/patient.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateAdapter } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HealthInsurance } from '../../interfaces/healthInsurance';
import { HealthInsuranceService } from '../../services/healthInsurance.service';
@Component({
  selector: 'app-detalle-patient',
  templateUrl: './detalle-patient.component.html',
  styleUrl: './detalle-patient.component.css'
})
export class DetallePatientComponent implements OnInit {

  healthInsurences: HealthInsurance[] = [];
  bloodGroup: string[] = ['A+', 'A-', 'B+', 'B-', '0+', '0-', 'AB+', 'AB-'];
  form: FormGroup;
  loading: boolean = false;
  operacion: string = 'Agregar';
  id: number | undefined;
  constructor(public dialogRef: MatDialogRef<DetallePatientComponent>, private _healthInsuranceService: HealthInsuranceService, private fb: FormBuilder, private _patientService: PatientService, private _snackBar: MatSnackBar, dateAdapter: DateAdapter<any>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.fb.group({
      firstname: [null, [Validators.required, Validators.maxLength(40)]],
      lastname: [null, [Validators.required, Validators.maxLength(40)]],
      dni: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      phoneNumber: [null, Validators.required],
      address: [null, Validators.required],
      email: [null, Validators.required],
      birthDate: [null, Validators.required],
      healthInsurance: ['', Validators.required],
    })
    this.id = data.id;
    dateAdapter.setLocale('es-AR');
  }
  ngOnInit(): void {
    this.obtenerObrasSociales();
    this.isEdit(this.id);
  }
  cancelar() {
    this.dialogRef.close(false);
  }
  isEdit(id: number | undefined) {
    if (id !== undefined) {
      this.operacion = 'Editar';
      this.getPatient(id);
    }
  }
  obtenerObrasSociales() {
    this._healthInsuranceService.getHealthInsurances().subscribe(data => {
      this.healthInsurences = data;
      console.log('Obras Sociales:', this.healthInsurences)
    });
  }
  getPatient(id: number) {
    this._patientService.getPatient(id).subscribe(data => {
      // Asegúrate de que 'data.healthInsurance' sea un objeto
      const selectedHealthInsurance = this.healthInsurences.find(hi => hi.id === data.healthInsurance?.id);

      this.form.patchValue({
        firstname: data.firstname,
        lastname: data.lastname,
        dni: data.dni,
        phoneNumber: data.phoneNumber,
        address: data.address,
        email: data.email,
        birthDate: new Date(data.birthDate),
        healthInsurance: selectedHealthInsurance || null  // Asignamos el objeto completo
      });
      console.log('Paciente:', data);
    });
  }


}

