import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Secretary } from '../../interfaces/secretary';
import { SecretaryService } from '../../services/secretary.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-agregar-editar-secretary',
  templateUrl: './agregar-editar-secretary.component.html',
  styleUrl: './agregar-editar-secretary.component.css'
})
export class AgregarEditarSecretaryComponent implements OnInit {


  tipoDocumento: string[] = ['DNI', 'Libreta Civica', 'Pasaporte'];
  form: FormGroup;
  loading : boolean = false;
  operacion: string = 'Agregar';
  id: number | undefined;
  constructor(public dialogRef: MatDialogRef<AgregarEditarSecretaryComponent>, private fb:FormBuilder, private _secretaryService: SecretaryService,private _snackBar :MatSnackBar, private dateAdapter:DateAdapter<any>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
      this.getSecretary(id);
    }
  }

  getSecretary(id: number){
    this._secretaryService.getSecretary(id).subscribe(data => {
      this.form.patchValue({
        firstname:data.firstname,
        lastname:data.lastname,
        mail:data.mail,
        dniType:data.dniType,
        dni:data.dni,
        username:data.username,
        bornDate:new Date(data.bornDate) 

      })

    });
  }
  addEditSecretary(){

    const secretary: Secretary = {
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
    //console.log(secretary);
    this.loading = true;
    
    if(this.id === undefined){
      //IS ADD
      this._secretaryService.addSecretary(secretary).subscribe(() => {
        this.successMessage("agregada");
      });

    }else{
      //IS EDIT
      this._secretaryService.updateSecretary(this.id, secretary).subscribe(() => {
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
