import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Medic } from '../../interfaces/medic.js';
import { MedicService } from '../../services/medic.service.js';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpecialtyService } from '../../services/specialty.service.js';
import { Specialty } from '../../interfaces/specialty.js';

@Component({
  selector: 'app-add-edit-medic',
  templateUrl: './add-edit-medic.component.html',
  styleUrl: './add-edit-medic.component.css'
})



export class AddEditMedicComponent implements OnInit {
  tipoDocumento: string[] = ['DNI', 'Libreta Civica', 'Pasaporte'];
  specialties: Specialty[] = [];
  form: FormGroup;
  loading: boolean = false;

  constructor(public dialogRef: MatDialogRef<AddEditMedicComponent>, private _specialtyService: SpecialtyService,
    public fb: FormBuilder, private _medicService: MedicService
  , private _snackBar: MatSnackBar) {
    this.form = this.fb.group({
      firstname: ['', [Validators.required, Validators.maxLength(20)]],
      lastname: ['', [Validators.required, Validators.maxLength(20)]],
      dniType: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      username: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.maxLength(12)]],
      medicalConsultationValue: ['', [Validators.required, Validators.maxLength(5)]],
      license: ['', [Validators.required, Validators.pattern('^[0-5]*$')]],
      specialty: ['', Validators.required]
      //consultationHours: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.obternerEspecialidades();
  }

  cancelar() {
    this.dialogRef.close(false);
  }
  mensajeExito() {
    this._snackBar.open('Medico agregado con exito', '', {
      duration: 1500,
    });
  }

  obternerEspecialidades() {
    this._specialtyService.getSpecialties().subscribe(data => {
      this.specialties = data;
      console.log('Especialidades:', this.specialties);
    });
  }


  
  addEditMedico() {


      const medic: Medic = {
        firstname: this.form.value.firstname,
        lastname: this.form.value.lastname,
        dniType: this.form.value.dniType,
        dni: this.form.value.dni,
        username: this.form.value.username,
        password: this.form.value.password,
        medicalConsultationValue: this.form.value.medicalConsultationValue,
        license: this.form.value.license,
        specialty: this.form.value.specialty.id
        //consultationHours: this.form.value.consultationHours
      }

      this.loading = true;

      this._medicService.addMedico(medic).subscribe(() => {
        this.loading = false;
        this.mensajeExito();
        this.dialogRef.close(true);
      }); 
    }
  }

 

