import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Persona } from '../../interfaces/persona';
import { PersonaService } from '../../services/persona.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-agregar-editar-persona',
  templateUrl: './agregar-editar-persona.component.html',
  styleUrl: './agregar-editar-persona.component.css'
})
export class AgregarEditarPersonaComponent implements OnInit {


  tipoDocumento: string[] = ['DNI', 'Libreta Civica', 'Pasaporte'];
  form: FormGroup;
  loading : boolean = false;
  operacion: string = 'Agregar';
  id: number | undefined;
  constructor(public dialogRef: MatDialogRef<AgregarEditarPersonaComponent>, private fb:FormBuilder, private _personaService: PersonaService,private _snackBar :MatSnackBar, private dateAdapter:DateAdapter<any>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      mail: ['', Validators.required],
      dniType: [null, Validators.required],
      dni: [null, Validators.required],
      bornDate: [null, Validators.required],
      password: [null, Validators.required],
      username: [null, Validators.required]
    })
    this.id = data.id;
    dateAdapter.setLocale('es-AR');
  }
  ngOnInit(): void {
    this.isEdit(this.id)
  }
  cancelar(){
    this.dialogRef.close(false);
  }
  isEdit(id: number|undefined){
    if(id !== undefined){
      this.operacion = 'Editar';
      this.getPersona(id);
    }
  }

  getPersona(id: number){
    this._personaService.getPersona(id).subscribe(data => {
      this.form.patchValue({
        firstname:data.firstname,
        lastname:data.lastname,
        mail:data.mail,
        dniType:data.dniType,
        dni:data.dni,
        bornDate:new Date(data.bornDate) 

      })

    });
  }
  addEditPersona(){

    const persona: Persona = {
      firstname: this.form.value.firstname,
      lastname: this.form.value.lastname,
      mail: this.form.value.mail,
      dniType: this.form.value.dniType,
      dni: this.form.value.dni,
      bornDate: this.form.value.bornDate.toISOString().slice(0, 10),
      password: this.form.value.password,
      username: this.form.value.username,
      id: this.form.value.id
      
    }
    console.log(persona);
    this.loading = true;
    
    if(this.id === undefined){
      //IS ADD
      this._personaService.addPersona(persona).subscribe(() => {
        this.successMessage("agregada");
      });

    }else{
      //IS EDIT
      this._personaService.updatePersona(this.id, persona).subscribe(() => {
        this.successMessage("actualizada");
      });

    }

    this.loading = false;
    this.dialogRef.close(true);
    
}
successMessage(operation: string){
  this._snackBar.open(`La secretaria fue ${operation} con exito`,"" ,{
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom'
  });
}


}
