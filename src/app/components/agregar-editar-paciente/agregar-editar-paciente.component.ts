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
  loading : boolean = false;
  operacion: string = 'Agregar';
  id: number | undefined;
  constructor(public dialogRef: MatDialogRef<AgregarEditarPatientComponent>, private _healthInsuranceService: HealthInsuranceService, private fb:FormBuilder, private _patientService: PatientService,private _snackBar :MatSnackBar, private dateAdapter:DateAdapter<any>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.fb.group({
      firstname: ['', Validators.required, Validators.maxLength(40)],
      lastname: ['', Validators.required, Validators.maxLength(40)],
      dni: ['', Validators.required, Validators.pattern('^[0-9]*$')],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      birthDate: ['', Validators.required],
      grupoSanguineo: ['', Validators.required],
      antecedentesPersonales: ['', Validators.required],
      antecedentesFamiliares: ['', Validators.required],
      healthInsurance: ['', Validators.required],
    })
    this.id = data.id;
    dateAdapter.setLocale('es-AR');
  }
  ngOnInit(): void {
    this.isEdit(this.id);
    this.obtenerObrasSociales();
  }
  cancelar(){
    this.dialogRef.close(false);
  }
  isEdit(id: number|undefined){
    if(id !== undefined){
      this.operacion = 'Editar';
      this.getPatient(id);
    }
  }
  obtenerObrasSociales(){
    this._healthInsuranceService.getHealthInsurances().subscribe(data => {
      this.healthInsurences=data;
      console.log('Obras Sociales:', this.healthInsurences)
    });
  }
  getPatient(id: number){
    this._patientService.getPatient(id).subscribe(data => {
      this.form.patchValue({
        firstname:data.firstname,
        lastname:data.lastname,
        dni:data.dni,
        phoneNumber:data.phoneNumber,
        address:data.address,
        email:data.email,
        birhtDate:new Date(data.birthDate),
        grupoSanguineo:data.grupoSanguineo,
        antecedentesPersonales:data.antecedentesPersonales,
        antecedentesFamiliares:data.antecedentesFamiliares,
        healthInsurance:data.healthInsurance
      })

    });
  }
  addEditPatient(){

    const patient: Patient = {
      firstname: this.form.value.firstname,
      lastname: this.form.value.lastname,
      dni: this.form.value.dni,
      phoneNumber: this.form.value.phoneNumber,
      address: this.form.value.address,
      email: this.form.value.email,
      birthDate: this.form.value.birthDate.toISOString().slice(0, 10),
      grupoSanguineo: this.form.value.grupoSanguineo,
      antecedentesPersonales: this.form.value.antecedentesPersonales,
      antecedentesFamiliares: this.form.value.antecedentesFamiliares,
      healthInsurance: this.form.value.healthInsurance,    
      id: this.form.value.id,
    }
    //console.log(patient);
    this.loading = true;
    
    if(this.id === undefined){
      //IS ADD
      this._patientService.addPatient(patient).subscribe(() => {
        this.successMessage("agregada");
      });

    }else{
      //IS EDIT
      this._patientService.updatePatient(this.id, patient).subscribe(() => {
        this.successMessage("actualizada");
      });

    }

    this.loading = false;
    this.dialogRef.close(true);
    
}
successMessage(operation: string){
  this._snackBar.open(`El Paciente fue ${operation} con exito`,"" ,{
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom'
  });
}


}
