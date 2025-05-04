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
  patientNotFound: boolean = false;
  unabailableDates: any;
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
      dni: [null, [Validators.required]],
      medic: [null, [Validators.required]],
      date: [Date, [Validators.required]],
      consultationHours: [null, [Validators.required]],
    });
  }

  addTurno() {
    this.loading = true;

    // Obtener el paciente mediante suscripción
    this._patientService.getPatientByDni(this.form.value.dni).subscribe(
      (aPatient: any) => {
        const aAttention: Attention = {
          patient: aPatient.id, // aca ya tenemos el paciente
          date: this.form.value.date,
          consultationHours: this.form.value.consultationHours.id,
        };

        // Agregar la atención
        this._attentionService.addAttention(aAttention).subscribe(() => {
          this.successMessage('agregada');
          console.log('Turno agregado:', aAttention); // para probar
          setTimeout(() => {
              window.location.reload(); // ← AGREGADO
             }, 1500); // ← AGREGADO
        });

        //Muestra las atenciones
        this._attentionService.getAttentions().subscribe((atenciones) => {
          console.log('Atenciones:', atenciones);
        });

        this.form.reset(); // Reiniciar el formulario después de agregar la atención
        Object.keys(this.form.controls).forEach(key => {
          const control = this.form.get(key);
          control?.setErrors(null); // Clear any existing errors
          control?.markAsPristine();
          control?.markAsUntouched();
        });
        this.loading = false;
        //this.dialogRef.close(true);
      },
      (error) => {
        // Manejo de errores al obtener el paciente
        console.error('Error al obtener el paciente:', error);
        this.loading = false;
      }
    );
  }

  ngOnInit(): void {
    this.obternerHoras();
    this.obternerMedicos();
  }
cancelar() {
  this._snackBar.open('Turno cancelado', '', {
    duration: 1500, // 1.5 segundos
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
  });

  setTimeout(() => {
    window.location.reload(); // ← Recarga después del mensaje
  }, 1500);

  this.dialogRef.close(false); // Cierra el diálogo
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
        //Filtro los horarios segun su medico y que no tengaa una atencion

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
    // Prevent Saturday and Sunday from being selected.
    const days = [
      'Lunes',
      'Martes',
      'Miercoles',
      'Jueves',
      'Viernes',
      'Sabado',
      'Domingo',
    ];
    const attentionDays: number[] = [];
    //Filtro los dias de atencion y guardo 1 para lunes, 2 para martes, etc
    this.filteredConsultationHours.forEach((element) => {
      attentionDays.push(days.indexOf(element.day));
    });

    //Obtengo el medico seleccionado
    const medic = this.form.value.medic;

    //retorna tru si la fecha esta en las fechas no disponibles
    if (this.unabailableDates) {
      const unavailable = this.unabailableDates.find(
        (date: string) => date === d?.toISOString().slice(0, 10)
      );
      if (unavailable) return false;
    }

    //retorna true si el dia no esta en el array de dias de atencion
    return attentionDays.includes(day - 1);
  };

  onMedicChange(selectedMedic: any): void {
    this.filteredConsultationHours = this.consultationHours.filter(
      (consultationHour) => {
        return consultationHour.medic.id === selectedMedic.id;
      }
    );

    //Seteo fechas deshabilitadas
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

    // Filtrar horarios por el día de la semana
    let availableHours = this.filteredConsultationHours.filter(
      (consultationHour) => consultationHour.day === daySelected
    );
    const formattedDate = selectedDate.toISOString().split('T')[0];
    // Obtener los IDs de los horarios ocupados para la fecha seleccionada
    this._attentionService
      .getAttentionsByDate(selectedDate)
      .subscribe((data) => {
        const occupiedHours = data; // Los IDs de los horarios ocupados
        // Filtrar horarios disponibles eliminando los ocupados
        this.filteredConsultationHours = availableHours.filter(
          (consultationHour) => !occupiedHours.includes(consultationHour.id)
        );


      });
  }

  checkPatient() {
    const dni = this.form.get('dni')?.value;
    if (!dni) return; // No realizar la búsqueda si el campo está vacío

    this._patientService.getPatientByDni(dni).subscribe(
      (aPatient: any) => {
        this.patientNotFound = false; // El paciente existe
        this.form.get('dni')?.setErrors(null); // Si el paciente existe, eliminamos el error
        this.cdr.detectChanges(); // Forzar la detección de cambios
      },
      (error) => {
        this.patientNotFound = true; // El paciente no existe
        this.form.get('dni')?.setErrors({ patientNotFound: true }); // Establecemos el error
        this.cdr.detectChanges(); // Forzar la detección de cambios
      }
    );
  }
  redirectToCreatePatient(): void {
    this.router.navigate(['/patient']); // Asegúrate de que esta ruta exista
  }
}
