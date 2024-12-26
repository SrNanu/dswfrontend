import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Medic } from '../../interfaces/medic.js';
import { MedicService } from '../../services/medic.service.js';
import { ConsultationHours } from '../../interfaces/consultationHours.js';
import { ConsultationHoursService } from '../../services/consultationHours.service.js';
import { Attention } from '../../interfaces/attention.js';
import { Patient } from '../../interfaces/patient.js';
import { PatientService } from '../../services/patient.service.js';
import { AttentionService } from '../../services/attentions.service.js';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker/index.js';
@Component({
  selector: 'app-otorgar-turno',
  templateUrl: './otorgar-turno.component.html',
  styleUrls: ['./otorgar-turno.component.css'],
})
export class OtorgarTurnoComponent implements OnInit {
  loading: any;
  medics: Medic[] = [];
  consultationHours: ConsultationHours[] = [];
  filteredConsultationHours: ConsultationHours[] = [];
  form: FormGroup;

  constructor(@Optional() public dialogRef: MatDialogRef<OtorgarTurnoComponent>,
    private fb: FormBuilder
    , private _medicService: MedicService
    , private _consultationHoursService: ConsultationHoursService
    , private _patientService: PatientService
    , private _attentionService: AttentionService
    , private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      dni: [null, [Validators.required]],
      medic: [null, [Validators.required]],
      date: [Date, [Validators.required]],
      consultationHours: [null, [Validators.required]]
    })
  }


  addTurno() {
    this.loading = true;
  
    // Obtener el paciente mediante suscripción
    this._patientService.getPatientByDni(this.form.value.dni).subscribe((aPatient: any) => {
      const aAttention: Attention = {
        patient: aPatient.id, // Aquí ya tenemos el paciente
        date: this.form.value.date,
        consultationHours: this.form.value.consultationHours.id,
      };
  
      console.log('Atención:', aAttention);
  
      // Agregar la atención
      this._attentionService.addAttention(aAttention).subscribe(() => {
        this.successMessage('agregada');
        console.log('Turno agregado:', aAttention); // para probar
        
      });

      //Muestra las atenciones
      this._attentionService.getAttentions().subscribe((atenciones) => {
      console.log('Atenciones:', atenciones)});
  
      this.loading = false;
      //this.dialogRef.close(true);
    }, (error) => {
      // Manejo de errores al obtener el paciente
      console.error('Error al obtener el paciente:', error);
      this.loading = false;
    });
  }
  

  ngOnInit(): void {
    this.obternerHoras();
    this.obternerMedicos();
  }
  cancelar() {
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
      //Filtro los horarios segun su medico y que no tengaa una atencion
      
     
      console.log('Horas de consulta:', this.consultationHours);
    });
  }

  successMessage(operation: string) {
    this._snackBar.open(`La consulta fue ${operation} con exito`, "", {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
    myFilter = (d: Date | null): boolean => {
      const day = (d || new Date()).getDay();
      // Prevent Saturday and Sunday from being selected.
      const days = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"];
      const attentionDays:number[] = []
      //Filtro los dias de atencion y guardo 1 para lunes, 2 para martes, etc
      this.filteredConsultationHours.forEach(element => {
        attentionDays.push(days.indexOf(element.day));
      });
      
      //retorna true si el dia no esta en el array de dias de atencion
      return attentionDays.includes(day-1) ;
    };
  
    onMedicChange(selectedMedic: any): void {
      console.log('Médico seleccionado:', selectedMedic);
      this.filteredConsultationHours = this.consultationHours.filter((consultationHour) => {
        return consultationHour.medic.id === selectedMedic.id;
      });
      console.log('Horas de consulta filtradas:', this.filteredConsultationHours);
    }
    
}
