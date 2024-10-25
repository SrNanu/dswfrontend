import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConsultationHours } from '../../interfaces/consultationHours.js';
import { ConsultationHoursService } from '../../services/consultationHours.service.js';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agregar-editar-consultationHours',
  templateUrl: './agregar-editar-consultationHours.component.html',
  styleUrl: './agregar-editar-consultationHours.component.css'
})
export class AgregarEditarConsultationHoursComponent implements OnInit {

  form: FormGroup;
  loading : boolean = false;
  operation: string = 'Agregar ';
  id : number | undefined;

  constructor(public dialogRef: MatDialogRef<AgregarEditarConsultationHoursComponent>,
    private fb: FormBuilder, private _consultationHoursService: ConsultationHoursService
    , private _snackBar :MatSnackBar
    , @Inject(MAT_DIALOG_DATA) public data: any) {
      this.form = this.fb.group({
        day: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
        startTime: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
        endTime: ['', [Validators.required, Validators.maxLength(20)]]
      })
      this.id = data.id;
     }

  ngOnInit(): void {
    this.isEdit(this.id);
  }

  isEdit(id: number | undefined){
    if(id !== undefined){
      this.operation = 'Editar ';
      this.getConsultationHours(id);
    }
  }

  getConsultationHours(id: number){
    this._consultationHoursService.getConsultationHours(id).subscribe(data => {
      console.log(data);
      this.form.patchValue({
        day: data.day,
        startTime: data.startTime,
        endTime: data.endTime
      })
    })
  }


  cancelar(){
    this.dialogRef.close(false);
  }

  addEditConsultationHours() {

    const aConsultationHours: ConsultationHours = {
      day: this.form.value.day,
      startTime: this.form.value.startTime,
      endTime: this.form.value.endTime
    }

    this.loading = true;


    if(this.id === undefined){
      //es agregar
      this._consultationHoursService.addConsultationHours(aConsultationHours).subscribe(() => {
        this.successMessage('agregada');
      });

    }else {
      // es editar
      this._consultationHoursService.updateConsultationHours(this.id, aConsultationHours).subscribe(data => {
        this.successMessage('actualizada');
      });
    }

    this.loading = false;
    this.dialogRef.close(true);

  }

  successMessage(operation: string){
    this._snackBar.open(`La consulta fue ${operation} con exito`,"" ,{
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

}
