import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Patient } from '../../interfaces/patient';
import { PatientService } from '../../services/patient.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateAdapter } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-agregar-editar-paciente',
  templateUrl: './agregar-editar-paciente.component.html',
  styleUrl: './agregar-editar-paciente.component.css'
})
export class AgregarEditarPatientComponent implements OnInit {


  bloodGroup: string[] = ['A+', 'A-', 'B+', 'B-', '0+', '0-', 'AB+', 'AB-'];
  form: FormGroup;
  loading : boolean = false;
  operacion: string = 'Agregar';
  id: number | undefined;
  constructor(public dialogRef: MatDialogRef<AgregarEditarPatientComponent>, private fb:FormBuilder, private _patientService: PatientService,private _snackBar :MatSnackBar, private dateAdapter:DateAdapter<any>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      dni: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      address: [null, Validators.required],
      email: [null, Validators.required],
      birthDate: [null, Validators.required],
      grupoSanguineo: [null, Validators.required],
      antecedentesPersonales: [null, Validators.required],
      antecedentesFamiliares: [null, Validators.required],
      healthInsurance: [null, Validators.required],
    })
    this.id = data.id;
    dateAdapter.setLocale('es-AR');
  }
  ngOnInit(): void {
    this.isEdit(this.id)
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
        id: this.form.value.id,
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
      healthInsurance: this.form.value.healthInsurance      
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
