import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Medic } from '../../interfaces/medic.js';
import { MedicService } from '../../services/medic.service.js';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpecialtyService } from '../../services/specialty.service.js';
import { Specialty } from '../../interfaces/specialty.js';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-otorgar-turno',
  templateUrl: './otorgar-turno.component.html',
  styleUrl: './otorgar-turno.component.css'
})
export class OtorgarTurnoComponent {
cancelar() {
throw new Error('Method not implemented.');
}
loading: any;
listMedics: string[] = ['Lopez', 'Perez'];
listHorario: string[] = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
}
