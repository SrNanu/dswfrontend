import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HealthInsurance } from '../../interfaces/healthInsurance.js';
import { HealthInsuranceService } from '../../services/healthInsurance.service.js';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agregar-editar-healthInsurance',
  templateUrl: './agregar-editar-healthInsurance.component.html',
  styleUrl: './agregar-editar-healthInsurance.component.css'
})
export class AgregarEditarHealthInsuranceComponent implements OnInit {

  form: FormGroup;
  loading: boolean = false;
  operation: string = 'Agregar ';
  id: number | undefined;

  constructor(public dialogRef: MatDialogRef<AgregarEditarHealthInsuranceComponent>,
    private fb: FormBuilder, private _healthInsuranceService: HealthInsuranceService
    , private _snackBar: MatSnackBar
    , @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(40)]]
    })
    this.id = data.id;
  }

  ngOnInit(): void {
    this.isEdit(this.id);
  }

  isEdit(id: number | undefined) {
    if (id !== undefined) {
      this.operation = 'Editar ';
      this.getHealthInsurance(id);
    }
  }

  getHealthInsurance(id: number) {
    this._healthInsuranceService.getHealthInsurance(id).subscribe(response => {
      console.log(response); // Confirma aquí la estructura de los datos
      this.form.patchValue({
        name: response.data.name // Asegúrate de acceder correctamente a `name`
      });
    });
  }


  cancelar() {
    this.dialogRef.close(false);
  }

  addEditHealthInsurance() {

    const aHealthInsurance: HealthInsurance = {
      name: this.form.value.name,
      data: undefined
    }

    this.loading = true;


    if (this.id === undefined) {
      //es agregar
      this._healthInsuranceService.addHealthInsurance(aHealthInsurance).subscribe(() => {
        this.successMessage('agregada');
      });

    } else {
      // es editar
      this._healthInsuranceService.updateHealthInsurance(this.id, aHealthInsurance).subscribe(data => {
        this.successMessage('actualizada');
      });
    }

    this.loading = false;
    this.dialogRef.close(true);

  }

  successMessage(operation: string) {
    this._snackBar.open(`La Obra Social fue ${operation} con exito`, "", {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

}
