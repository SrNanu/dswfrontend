import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Attention } from '../../../interfaces/attention.js';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AttentionService } from '../../../services/attentions.service.js';
import { MatSnackBar } from '@angular/material/snack-bar';
import { get } from 'http';

@Component({
  selector: 'app-agregar-consulta',
  templateUrl: './agregar-consulta.component.html',
  styleUrl: './agregar-consulta.component.css'
})
export class AgregarConsultaComponent {
  form: FormGroup;
  loading: boolean = false;
  attentionForTheDaySelected: Attention[] = [];
  turnoVacio: Attention | undefined;


  constructor
    (
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<AgregarConsultaComponent>,
      private _AttentionService: AttentionService,
      private _snackBar: MatSnackBar,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    this.form = this.fb.group({
      date: ['', [Validators.required]],
      result: ['', [Validators.required]],
      reason: ['', [Validators.required]],
      currentIllness: ['', [Validators.required]],
      vitalSigns: ['', [Validators.required]],
      physicalExamination: ['', [Validators.required]],
      diagnosis: ['', [Validators.required]],
      treatment: ['', [Validators.required]],
      observation: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {


  }


  agregarAttention() {
    this._AttentionService.getAttentionsByPatientId(this.data.id)
      .subscribe((attentions: Attention[]) => {
        this.attentionForTheDaySelected = attentions;

        // busco si hay un turno que debe ser completado
        this.turnoVacio = this.attentionForTheDaySelected.find(turno => {
          const turnoDate = new Date(turno.date); // parseo pq viene como string
          const selectedDate = new Date(this.form.value.date); // hago la date para comparar

          // comparo sin tiempo
          return turnoDate.toISOString().split('T')[0] === selectedDate.toISOString().split('T')[0] &&
            turno.reason === "";
        });

        //console.log('Turno Vacio:', this.turnoVacio);  // veo si se encontro

        // aca updateo si lo encontro
        if (this.turnoVacio) {
          const updatedAttention = {
            id: this.turnoVacio.id,
            result: this.form.value.result,
            date: this.form.value.date,
            reason: this.form.value.reason,
            currentIllness: this.form.value.currentIllness,
            vitalSigns: this.form.value.vitalSigns,
            physicalExamination: this.form.value.physicalExamination,
            diagnosis: this.form.value.diagnosis,
            treatment: this.form.value.treatment,
            observation: this.form.value.observation,
            dateCancelled: this.turnoVacio.dateCancelled,
            consultationHours: this.turnoVacio.consultationHours,
            patient: this.turnoVacio.patient.id ? this.turnoVacio.patient.id : this.turnoVacio.patient
          } as Attention;

          this._AttentionService.updateAttention(this.turnoVacio.id as number, updatedAttention)
            .subscribe(() => {
              this.successMessage('agregada');
              this.dialogRef.close();
            }, error => {
              console.error('Error updating attention:', error);
            });
        } else {
          // muestro que no tenia turno
          this._snackBar.open(`El Paciente no tiene turno para esta fecha, porfavor ingrese otra`, "", {
            duration: 8000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }

      }, error => {
        console.error('Error fetching attentions:', error);
      });
  }



  successMessage(operation: string) {
    this._snackBar.open(`La Consulta fue ${operation} con exito`, "", {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  close() {
    this.dialogRef.close();
  }

}
