import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Medic } from '../../interfaces/medic';
import { MedicService } from '../../services/medic.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateAdapter } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HealthInsurance } from '../../interfaces/healthInsurance';
import { HealthInsuranceService } from '../../services/healthInsurance.service';
import { SpecialtyService } from '../../services/specialty.service';
import { Specialty } from '../../interfaces/specialty';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-detalle-medic',
  templateUrl: './detalle-medic.component.html',
  styleUrl: './detalle-medic.component.css',
})
export class DetalleMedicComponent implements OnInit {
  specialtys: Specialty[] = [];
  bloodGroup: string[] = ['A+', 'A-', 'B+', 'B-', '0+', '0-', 'AB+', 'AB-'];
  form: FormGroup;
  loading: boolean = false;
  operacion: string = 'Agregar';
  id: number | undefined;
  constructor(
    public dialogRef: MatDialogRef<DetalleMedicComponent>,
    private _specialtyService: SpecialtyService,
    private fb: FormBuilder,
    private _medicService: MedicService,
    private _snackBar: MatSnackBar,
    dateAdapter: DateAdapter<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      firstname: ['', [Validators.required, Validators.maxLength(20)]],
      lastname: ['', [Validators.required, Validators.maxLength(20)]],
      dniType: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      username: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.maxLength(12)]],
      medicalConsultationValue: [
        '',
        [Validators.required, Validators.maxLength(5)],
      ],
      license: ['', [Validators.required, Validators.pattern('^\\d{4,8}$')]],
      specialty: ['', Validators.required],
      consultationHours: ['', Validators.required],
    });
    this.id = data.id;
    dateAdapter.setLocale('es-AR');
  }
  ngOnInit(): void {
    this.obtenerEspecialidades();
    this.isEdit(this.id);
  }
  cancelar() {
    this.dialogRef.close(false);
  }
  isEdit(id: number | undefined) {
    if (id !== undefined) {
      this.operacion = 'Editar';
      this.getMedic(id);
    }
  }
  obtenerEspecialidades() {
    this._specialtyService.getSpecialties().subscribe((data) => {
      this.specialtys = data;
      console.log('Obras Sociales:', this.specialtys);
    });
  }
  getMedic(id: number) {
    this._medicService.getMedico(id).subscribe((data) => {
      // Asegúrate de que 'data.healthInsurance' sea un objeto
      const selectedSpecialty = this.specialtys.find(
        (hi: Specialty) => hi.id === data.specialty?.id
      );

      this.form.patchValue({
        firstname: data.firstname,
        lastname: data.lastname,
        dniType: data.dniType,
        dni: data.dni,
        username: data.username,
        password: data.password,
        medicalConsultationValue: data.medicalConsultationValue,
        license: data.license,
        specialty: selectedSpecialty?.name || undefined
      });
      console.log('Paciente:', data);
    });
  }
}

