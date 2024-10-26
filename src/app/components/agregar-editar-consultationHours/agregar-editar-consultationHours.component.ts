import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConsultationHours } from '../../interfaces/consultationHours.js';
import { ConsultationHoursService } from '../../services/consultationHours.service.js';
import { MedicService } from '../../services/medic.service.js';
import { Medic } from '../../interfaces/medic.js';

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

  medics: Medic[] = [];
  days= ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"];


  constructor(public dialogRef: MatDialogRef<AgregarEditarConsultationHoursComponent>,
    private fb: FormBuilder, private _consultationHoursService: ConsultationHoursService
    , private _snackBar :MatSnackBar
    , @Inject(MAT_DIALOG_DATA) public data: any
  , private _medicService: MedicService) {
      this.form = this.fb.group({
        day: [null, [Validators.required]],
        startTime: [null, [Validators.required, Validators.pattern("^[0-9:]*$"),  Validators.maxLength(20)]],
        endTime: [null, [Validators.required, Validators.pattern("^[0-9:]*$"),  Validators.maxLength(20)]],
        medic:[null, [Validators.required]]
      })
      this.id = data.id;
     }

  ngOnInit(): void {
    this.isEdit(this.id);
    this.obternerMedicos() ;
  }

  isEdit(id: number | undefined){
    if(id !== undefined){
      this.operation = 'Editar';
      this.getConsultationHours(id);
    }
  }

  getConsultationHours(id: number){
    this._consultationHoursService.getConsultationHours(id).subscribe(data => {
      console.log(data);
      console.log(data.day);
      console.log(data.startTime);
      this.form.patchValue({
        day: data.day,
        startTime: data.startTime,
        endTime: data.endTime,
        medic: data.medic
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
      endTime: this.form.value.endTime,
      medic: this.form.value.medic
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

  obternerMedicos() {
    this._medicService.getMedics().subscribe(data => {
      this.medics = data;
      console.log('Medicos:', this.medics);
    });
  }

}
