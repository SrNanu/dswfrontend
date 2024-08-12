import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Persona } from '../../interfaces/persona';

@Component({
  selector: 'app-agregar-editar-persona',
  templateUrl: './agregar-editar-persona.component.html',
  styleUrl: './agregar-editar-persona.component.css'
})
export class AgregarEditarPersonaComponent {


  tipoDocumento: string[] = ['DNI', 'Libreta Civica', 'Pasaporte'];
  form: FormGroup;
  
  constructor(public dialogRef: MatDialogRef<AgregarEditarPersonaComponent>, private fb:FormBuilder){
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      Mail: ['', Validators.required],
      DniType: [null, Validators.required],
      dni: [null, Validators.required],
      BornDate: [null, Validators.required],
      Password: [null, Validators.required],
      Username: [null, Validators.required]
    })
  }

  cancelar(){
    this.dialogRef.close();
  }
  addEditPersona(){

    const persona: Persona = {
      firstname: this.form.value.nombre,
      lastname: this.form.value.apellido,
      Mail: this.form.value.correo,
      DniType: this.form.value.tipoDocumento,
      dni: this.form.value.documento,
      BornDate: this.form.value.fechaNacimiento,
      Password: this.form.value.password,
      Username: this.form.value.usuario,
      id: this.form.value.id
    }
    console.log(persona);
  }


}
