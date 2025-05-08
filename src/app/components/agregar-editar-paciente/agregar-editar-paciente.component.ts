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
  selector: 'app-agregar-editar-paciente',
  templateUrl: './agregar-editar-paciente.component.html',
  styleUrl: './agregar-editar-paciente.component.css'
})
export class AgregarEditarPatientComponent implements OnInit {

  healthInsurences: HealthInsurance[] = [];
  bloodGroup: string[] = ['A+', 'A-', 'B+', 'B-', '0+', '0-', 'AB+', 'AB-'];
  form: FormGroup;
  loading: boolean = false;
  operacion: string = 'Agregar';
  id: number | undefined;
  constructor(public dialogRef: MatDialogRef<AgregarEditarPatientComponent>, private _healthInsuranceService: HealthInsuranceService, private fb: FormBuilder, private _patientService: PatientService, private _snackBar: MatSnackBar, dateAdapter: DateAdapter<any>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
      this.isEdit(this.id);
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
      console.log('Obras sociales', this.healthInsurences);
      console.log('Obra Social:', this.form.value.healthInsurance);
    
      console.log('Paciente:', data);
    });
  }

  addEditPatient() {

    const patient: Patient = {
      firstname: this.form.value.firstname,
      lastname: this.form.value.lastname,
      dni: this.form.value.dni,
      phoneNumber: this.form.value.phoneNumber,
      address: this.form.value.address,
      email: this.form.value.email,
      birthDate: this.form.value.birthDate ? this.form.value.birthDate.toISOString().slice(0, 10) : '',
      grupoSanguineo: "",
      antecedentesPersonales: "",
      antecedentesFamiliares: "",
      healthInsurance: this.form.value.healthInsurance.id,
      id: this.form.value.id,
    }
    console.log('paciente', patient);
    this.loading = true;

    if (this.id === undefined) {
      //IS ADD
      this._patientService.addPatient(patient).subscribe(() => {
        this.successMessage("agregada");
      });

    } else {
      //IS EDIT
      this._patientService.updatePatient(this.id, patient).subscribe(() => {
        this.successMessage("actualizada");
      });

    }

    this.loading = false;
    this.dialogRef.close(true);

  }
  successMessage(operation: string) {
    this._snackBar.open(`El Paciente fue ${operation} con exito`, "", {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }


}
