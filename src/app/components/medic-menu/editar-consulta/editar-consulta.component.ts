import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Attention } from '../../../interfaces/attention';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AttentionService } from '../../../services/attentions.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { get } from 'http';

@Component({
  selector: 'app-editar-consulta',
  templateUrl: './editar-consulta.component.html',
  styleUrl: './editar-consulta.component.css'
})
export class EditarConsultaComponent {
  form: FormGroup;
  loading: boolean = false;

  constructor
  (
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditarConsultaComponent>,
    private _AttentionService: AttentionService,
    private _snackBar :MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.form = this.fb.group({
      result: ['', [Validators.required]],
      reason: ['', [Validators.required]],
      observation: ['', [Validators.required]],
    })
}

  ngOnInit(): void {
    this.getAttention(this.data.id);
  }


  getAttention(id: number) {
    this._AttentionService.getAttention(id).subscribe(response => {

      this.form.patchValue({
        id : response.id,
        date: response.date,
        result: response.result,
        reason: response.reason,
        observation: response.observation,
        dateCancelled: response.dateCancelled,
        consultationHours: response.consultationHours.id,
        patient : response.patient.id,

      });
    });
  }

  editAttention() {
    const anAttention: Attention = {
      id : this.form.value.id,
      result: this.form.value.result,
      date: this.form.value.date,
      reason: this.form.value.reason,
      observation: this.form.value.observation,
      dateCancelled: this.form.value.dateCancelled,
      consultationHours: this.form.value.consultationHours,
      patient : this.form.value.patient
    };

    this.loading = true;

    this._AttentionService.updateAttention(this.data.id ,anAttention).subscribe(() => {
      this.successMessage('editada');
      this.loading = false;
      this.dialogRef.close(true);
    }, error => {
      this.loading = false;
      console.error("Error al editar la Consulta:", error);
    });

  }


  successMessage(operation: string){
    this._snackBar.open(`La Consulta fue ${operation} con exito`,"" ,{
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  close()
  {
    this.dialogRef.close();
  }



}
