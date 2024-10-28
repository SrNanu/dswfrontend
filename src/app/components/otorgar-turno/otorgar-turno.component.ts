import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Medic } from '../../interfaces/medic.js';
import { MedicService } from '../../services/medic.service.js';
import { ConsultationHours } from '../../interfaces/consultationHours.js';
import { ConsultationHoursService } from '../../services/consultationHours.service.js';

@Component({
  selector: 'app-otorgar-turno',
  templateUrl: './otorgar-turno.component.html',
  styleUrls: ['./otorgar-turno.component.css']
})
export class OtorgarTurnoComponent  implements OnInit{
  loading: any;
  medics: Medic[]= [];
  consultationHours: ConsultationHours[] = [];
  form: FormGroup;

  constructor( @Optional() public dialogRef: MatDialogRef<OtorgarTurnoComponent>,
    private fb: FormBuilder 
    , private _medicService: MedicService
    , private _consultationHoursService: ConsultationHoursService
    , @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.form = this.fb.group({
        dni: [null, [Validators.required]],
        medico: [null, [Validators.required]],
        fechaTurno: [null, [Validators.required]],
        horario:[null, [Validators.required]]
      })
     }


  addTurno() {
  throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
   this.obternerHoras();
    this.obternerMedicos() ;
  }
  cancelar(){
    this.dialogRef.close(false);
  }

  obternerMedicos() {
    this._medicService.getMedics().subscribe(data => {
      this.medics = data;
      console.log('Medicos:', this.medics);
    });
  }

  obternerHoras() {
    this._consultationHoursService.getAllConsultationHours().subscribe(data => {
      this.consultationHours = data;
      console.log('Horas de consulta:', this.consultationHours);
    });
  }

}
