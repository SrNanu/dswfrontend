import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Secretary } from '../../interfaces/secretary';
import { SecretaryService } from '../../services/secretary.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-agregar-editar-secretary',
  templateUrl: './agregar-editar-secretary.component.html',
  styleUrl: './agregar-editar-secretary.component.css',
})
export class AgregarEditarSecretaryComponent implements OnInit {
  tipoDocumento: string[] = ['DNI', 'Libreta Civica', 'Pasaporte'];
  form: FormGroup;
  loading: boolean = false;
  operacion: string = 'Agregar';
  hide: boolean = true;
  id: number | undefined;
  constructor(
    public dialogRef: MatDialogRef<AgregarEditarSecretaryComponent>,
    private fb: FormBuilder,
    private _secretaryService: SecretaryService,
    private _snackBar: MatSnackBar,
    private dateAdapter: DateAdapter<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      firstname: ['', [Validators.required, Validators.maxLength(20)]],
      lastname: ['', Validators.required],
      mail: ['', Validators.required],
      dniType: [null, Validators.required],
      dni: [null, Validators.required],
      bornDate: [null, Validators.required],
      password: [null, Validators.required],
      username: ['', [Validators.required, Validators.maxLength(20)]],
    });
    this.id = data.id;
    dateAdapter.setLocale('es-AR');
  }
  ngOnInit(): void {
    this.isEdit(this.id);
  }
  cancelar() {
    this.dialogRef.close(false);
  }
  isEdit(id: number | undefined) {
    if (id !== undefined) {
      this.operacion = 'Editar';
      this.getSecretary(id);
    }
  }

  getSecretary(id: number) {
    this._secretaryService.getSecretary(id).subscribe((data) => {
      this.form.patchValue({
        firstname: data.firstname,
        lastname: data.lastname,
        mail: data.mail,
        dniType: data.dniType,
        dni: data.dni,
        username: data.username,
        password: data.password,
        bornDate: new Date(data.bornDate),
      });
    });
  }
  addEditSecretary() {
    const secretary: Secretary = {
      firstname: this.form.value.firstname,
      lastname: this.form.value.lastname,
      mail: this.form.value.mail,
      dniType: this.form.value.dniType,
      dni: this.form.value.dni,
      bornDate: this.form.value.bornDate.toISOString().slice(0, 10),
      password: this.form.value.password,
      username: this.form.value.username,
      id: this.form.value.id,
    };

    this.loading = true;

    if (this.id === undefined) {
      // **Agregar secretaria**
      this._secretaryService.addSecretary(secretary).subscribe({
        next: () => {
          this.successMessage('agregada');
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.errorMessage(err.message);
          this.loading = false;
        },
      });
    } else {
      // **Editar secretaria**
      this._secretaryService.updateSecretary(this.id, secretary).subscribe({
        next: () => {
          this.successMessage('actualizada');
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.errorMessage(err.message);
          this.loading = false;
        },
      });
    }
  }

  successMessage(operation: string) {
    this._snackBar.open(`La secretaria fue ${operation} con exito`, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
  errorMessage(message: string) {
    this._snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['error-snackbar'],
    });
  }
}
