import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patient } from '../../interfaces/patient.js';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PatientService } from '../../services/patient.service.js';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-datos-medicos-paciente',
  templateUrl: './modal-datos-medicos-paciente.component.html',
  styleUrl: './modal-datos-medicos-paciente.component.css'
})
export class ModalDatosMedicosPacienteComponent {
  form: FormGroup;
  loading: boolean = false;

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

  editDatosMedicos() : void
  {

    const pacienteToUpdate: Patient = {
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

    console.log(this.data.id);

    this._PatientService.updatePatient(this.data.id , pacienteToUpdate).subscribe(() => {
      this.successMessage('actualizado');
      this.loading = false;
      this.dialogRef.close(true);
    }, error => {
      this.loading = false;
      console.error("Error al actualizar especialidad:", error);
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
