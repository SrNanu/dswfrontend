import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Secretary } from '../../interfaces/secretary';
import { SecretaryService } from '../../services/secretary.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateAdapter } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-detalle-secretary',
  templateUrl: './detalle-secretary.component.html',
  styleUrl: './detalle-secretary.component.css'
})
export class DetalleSecretaryComponent implements OnInit {

  form: FormGroup;
  loading: boolean = false;
  operacion: string = 'Agregar';
  id: number | undefined;
  constructor(public dialogRef: MatDialogRef<DetalleSecretaryComponent>, private fb: FormBuilder, private _secretaryService: SecretaryService, private _snackBar: MatSnackBar, dateAdapter: DateAdapter<any>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.fb.group({
      email: [null, Validators.required],
      user: [null, Validators.required],
      birthDate: [null, Validators.required],
    })
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
  this._secretaryService.getSecretary(id).subscribe(data => {
    const formattedDate = new Date(data.bornDate).toISOString().split('T')[0];
    this.form.patchValue({
      email: data.mail,
      user: data.username,
      birthDate: formattedDate // formato "YYYY-MM-DD"
    });
  });
}


}

