import { Component, Inject,  OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Medic } from '../../interfaces/medic';
import { MedicService } from '../../services/medic.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpecialtyService } from '../../services/specialty.service';
import { Specialty } from '../../interfaces/specialty';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-add-edit-medic',
  templateUrl: './add-edit-medic.component.html',
  styleUrl: './add-edit-medic.component.css'
})



export class AddEditMedicComponent implements OnInit {
  tipoDocumento: string[] = ['DNI', 'Libreta Civica', 'Pasaporte'];
  specialties: Specialty[] = [];
  form: FormGroup;
  operacion: string = 'Agregar';
  loading: boolean = false;
  id: number | undefined;
  hide: boolean = true;

  constructor(public dialogRef: MatDialogRef<AddEditMedicComponent>, 
    private _specialtyService: SpecialtyService,
    public fb: FormBuilder, private _medicService: MedicService, private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<any>) {
    this.form = this.fb.group({
      firstname: ['', [Validators.required, Validators.maxLength(20)]],
      lastname: ['', [Validators.required, Validators.maxLength(20)]],
      dniType: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      username: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.maxLength(12)]],
      medicalConsultationValue: ['', [Validators.required, Validators.maxLength(5)]],
      license: ['', [Validators.required, Validators.pattern('^\\d{4,8}$')]],
      specialty: [null, Validators.required],
      consultationHours: ['', Validators.required],
    })
    this.id = data.id;
    dateAdapter.setLocale('es-AR');
  }

  ngOnInit(): void {
    this.obternerEspecialidades();
    this.isEdit(this.id);
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  isEdit(id: number | undefined) {
    if (id !== undefined) {
      this.operacion = 'Editar';
      this.getMedico(id);
    }
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
  

  getMedico(id: number) {
    this._medicService.getMedico(id).subscribe(data => {
      const _specialty = this.specialties.find(s => s.id === data.specialty.id);
      this.form.patchValue({
        firstname: data.firstname, 
        lastname: data.lastname,
        dniType: data.dniType,
        dni: data.dni,
        username: data.username,
        password: data.password,
        medicalConsultationValue: data.medicalConsultationValue,
        license: data.license,
        specialty: _specialty
      })
      console.log("Especialidades" , this.specialties);
      console.log("specialty " , this.form.value.specialty);
      console.log(data);

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
        specialty: this.form.value.specialty.id,
        consultationHours: this.form.value.consultationHours,
      };

      this.loading = true;

    if (this.id === undefined) {
      //IS ADD
        this._medicService.addMedico(medic).subscribe(() => {
          this.successMessage("agregado");
        });
    
    } else {
      //IS EDIT
 
        this._medicService.updateMedico(this.id, medic).subscribe(() => {
          this.successMessage("actualizado");
        });

    }
  }
  
    successMessage(operation: string){
      this._snackBar.open(`El medico fue ${operation} con exito`, "", {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
   
      this.loading = false;
      this.mensajeExito();
      this.dialogRef.close(true);
    }}  
      
    
  

