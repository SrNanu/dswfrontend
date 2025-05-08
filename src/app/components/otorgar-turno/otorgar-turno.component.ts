import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Medic } from '../../interfaces/medic';
import { MedicService } from '../../services/medic.service';
import { ConsultationHours } from '../../interfaces/consultationHours';
import { ConsultationHoursService } from '../../services/consultationHours.service';
import { Attention } from '../../interfaces/attention';
import { Patient } from '../../interfaces/patient';
import { PatientService } from '../../services/patient.service';
import { AttentionService } from '../../services/attentions.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker/index';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
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
  filteredPatients: Patient[] = [];
  allPatients: Patient[] = [];
  patientNotFound: boolean = false;
  unabailableDates: any;

  medicWorkingDays: string[] = []; //almacena dias que trabaja el medico

  constructor(
    @Optional() public dialogRef: MatDialogRef<OtorgarTurnoComponent>,
    private fb: FormBuilder,
    private _medicService: MedicService,
    private _consultationHoursService: ConsultationHoursService,
    private _patientService: PatientService,
    private _attentionService: AttentionService,
    private _snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    this.form = this.fb.group({
      patientSearch: [null, [Validators.required]],
      medic: [null, [Validators.required]],
      date: [Date, [Validators.required]],
      consultationHours: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.obternerHoras();
    this.obternerMedicos();
    this.loadAllPatients();
  }

  loadAllPatients(): void {
    this._patientService.getPatients().subscribe(patients => {
      this.allPatients = patients;
    });
  }

  searchPatient(): void {
    const searchTerm = this.form.get('patientSearch')?.value;
    
    if (typeof searchTerm === 'string') {
      if (searchTerm.length < 2) {
        this.filteredPatients = [];
        this.patientNotFound = false;
        return;
      }
      
      const term = searchTerm.toLowerCase();
      this.filteredPatients = this.allPatients.filter(patient => 
        patient.dni.toLowerCase().includes(term) ||
        patient.firstname.toLowerCase().includes(term) ||
        patient.lastname.toLowerCase().includes(term)
      );
      
      this.patientNotFound = this.filteredPatients.length === 0;
      if (this.patientNotFound) {
        this.form.get('patientSearch')?.setErrors({ patientNotFound: true });
      } else {
        this.form.get('patientSearch')?.setErrors(null);
      }
    }
  }

  displayPatient(patient: Patient): string {
    return patient ? `${patient.dni} - ${patient.firstname} ${patient.lastname}` : '';
  }

  addTurno() {
    this.loading = true;
    
    const selectedPatient = this.form.value.patientSearch;
    
    if (!selectedPatient || typeof selectedPatient === 'string') {
      this._snackBar.open('Por favor seleccione un paciente válido', '', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      this.loading = false;
      return;
    }

    const aAttention: Attention = {
      patient: selectedPatient.id,
      date: this.form.value.date,
      consultationHours: this.form.value.consultationHours.id,
    };

    this._attentionService.addAttention(aAttention).subscribe(() => {
      this.successMessage('agregada');
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }, error => {
      console.error('Error al agregar atención:', error);
      this.loading = false;
    });
  }

  cancelar() {
    this._snackBar.open('Turno cancelado', '', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });

    setTimeout(() => {
      window.location.reload();
    }, 1500);

    this.dialogRef.close(false);
  }

  obternerMedicos() {
    this._medicService.getMedics().subscribe((data) => {
      this.medics = data;
    });
  }

  obternerHoras() {
    this._consultationHoursService
      .getAllConsultationHours()
      .subscribe((data) => {
        this.consultationHours = data;
      });
  }

  successMessage(operation: string) {
    this._snackBar.open(`La consulta fue ${operation} con exito`, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    const days = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miercoles',
      'Jueves',
      'Viernes',
      'Sabado',
    ];
    
    // Verificar si el día seleccionado está entre los días de trabajo del médico
    const dayName = days[day];
    return this.medicWorkingDays.includes(dayName);
  };

  onMedicChange(selectedMedic: any): void {
    // Filtrar horas por médico
    this.filteredConsultationHours = this.consultationHours.filter(
      (consultationHour) => consultationHour.medic.id === selectedMedic.id
    );

    // Obtener los días únicos en los que trabaja este médico
    this.medicWorkingDays = [...new Set(
      this.filteredConsultationHours.map(hour => hour.day)
    )];

    // Obtener fechas no disponibles
    this._attentionService
      .getUnavailableDates(selectedMedic.id)
      .subscribe((data) => {
        this.unabailableDates = data;
      });
  }
  onDateChange(): void {
    const selectedDate = this.form.value.date;
    if (!selectedDate) return;

    const day = selectedDate.getDay();
    const days = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miercoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ];
    const daySelected = days[day];

    // Filtrar horas disponibles para el médico en el día seleccionado
    let availableHours = this.filteredConsultationHours.filter(
      (consultationHour) => consultationHour.day === daySelected
    );

    const formattedDate = selectedDate.toISOString().split('T')[0];
    
    this._attentionService
      .getAttentionsByDate(selectedDate)
      .subscribe((data) => {
        const occupiedHours = data;
        // Mostrar solo las horas que no están ocupadas
        this.filteredConsultationHours = availableHours.filter(
          (consultationHour) => !occupiedHours.includes(consultationHour.id)
        );
      });
  }

  redirectToCreatePatient(): void {
    this.router.navigate(['/patient']);
  }
}
