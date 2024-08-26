import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Persona } from '../../interfaces/persona';
import { PersonaService } from '../../services/persona.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agregar-editar-persona',
  templateUrl: './agregar-editar-persona.component.html',
  styleUrl: './agregar-editar-persona.component.css'
})
export class AgregarEditarPersonaComponent {


  tipoDocumento: string[] = ['DNI', 'Libreta Civica', 'Pasaporte'];
  form: FormGroup;
  loading : boolean = false;
  constructor(public dialogRef: MatDialogRef<AgregarEditarPersonaComponent>, private fb:FormBuilder, private _personaService: PersonaService,private _snackBar :MatSnackBar) {
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
    this.dialogRef.close(false);
  }
  addEditPersona(){

    const persona: Persona = {
      firstname: this.form.value.firstname,
      lastname: this.form.value.lastname,
      Mail: this.form.value.Mail,
      DniType: this.form.value.DniType,
      dni: this.form.value.dni,
      BornDate: this.form.value.BornDate.toISOString().slice(0, 10),
      Password: this.form.value.Password,
      Username: this.form.value.Username,
      id: this.form.value.id
      
    }

    this.loading = true;
    
    console.log(persona.BornDate);
    console.log(persona);
    this._personaService.addPersona(persona).subscribe(() => {
      this.loading = false;
      this.dialogRef.close(true);
      this.successMessage();
    });
}
successMessage(){
  this._snackBar.open('La secretaria fue creada con exito',"" ,{
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom'
  });
}


}
