import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
<<<<<<< HEAD
import { Patient } from '../../../interfaces/patient';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PatientService } from '../../../services/patient.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HealthInsurance } from '../../../interfaces/healthInsurance';
=======
import { Patient } from '../../../interfaces/patient.js';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PatientService } from '../../../services/patient.service.js';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HealthInsurance } from '../../../interfaces/healthInsurance.js';
>>>>>>> upstream/master

@Component({
  selector: 'app-modal-datos-medicos-paciente',
  templateUrl: './modal-datos-medicos-paciente.component.html',
  styleUrl: './modal-datos-medicos-paciente.component.css'
})
export class ModalDatosMedicosPacienteComponent {
  form: FormGroup;
  loading: boolean = false;
  patientToHandle: Patient | undefined;

  constructor
  (
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalDatosMedicosPacienteComponent>,
    private _PatientService: PatientService,
    private _snackBar :MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      grupoSanguineo: ['', [Validators.required, Validators.pattern("^(A|B|AB|O)[+-]$")]],
      antecedentesPersonales: ['', [Validators.required]],
      antecedentesFamiliares: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
      if(this.data.edit == true){

        const patient = this._PatientService.getPatient(this.data.id).subscribe((data: Patient) => {
        this.form.patchValue({
        grupoSanguineo: data.grupoSanguineo,
        antecedentesPersonales: data.antecedentesPersonales,
        antecedentesFamiliares: data.antecedentesFamiliares,
      })

        this.patientToHandle = data;

    }, error => {
      console.error("Error al obtener paciente:", error);
    });
    }
  }


  editDatosMedicos() : void
  {



    if(this.data.edit == true){

      var pacienteToUpdate: Patient = {
      id : this.patientToHandle?.id,
      firstname : this.patientToHandle?.firstname as string,
      lastname : this.patientToHandle?.lastname as string,
      dni : this.patientToHandle?.dni as string,
      birthDate : this.patientToHandle?.birthDate as Date,
      address : this.patientToHandle?.address as string,
      email : this.patientToHandle?.email as string,
      healthInsurance : this.patientToHandle?.healthInsurance as HealthInsurance,
      phoneNumber : this.patientToHandle?.phoneNumber as string,
      grupoSanguineo: this.form.value.grupoSanguineo,
      antecedentesPersonales: this.form.value.antecedentesPersonales,
      antecedentesFamiliares: this.form.value.antecedentesFamiliares,
      }

    }
    else{
      var pacienteToUpdate: Patient = {
        id: this.data.id,
        firstname: this.data.firstname,
        lastname: this.data.lastname,
        dni: this.data.dni,
        birthDate: this.data.birthDate,
        address: this.data.address,
        grupoSanguineo: this.form.value.grupoSanguineo,
        antecedentesPersonales: this.form.value.antecedentesPersonales,
        antecedentesFamiliares: this.form.value.antecedentesFamiliares,
        email: this.data.email,
        healthInsurance: this.data.healthInsurance.id,
        phoneNumber: this.data.phoneNumber
      }
    }

    console.log(this.data.id);

    this._PatientService.updatePatient(this.data.id , pacienteToUpdate).subscribe(
      () => {
      this.successMessage('actualizado');
      this.loading = false;
      this.dialogRef.close(true);
    },
    error => {
      this.loading = false;
      console.error("Error al actualizar especialidad:", error);
      this._snackBar.open("Error updating patient data", "", { duration: 3000 });
    });
  }

  close()
  {
    this.dialogRef.close();
  }

  successMessage(operation: string){
    this._snackBar.open(`El paciente fue ${operation} con exito`,"" ,{
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

}
