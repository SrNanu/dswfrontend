import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Specialty } from '../../interfaces/specialty.js';
import { SpecialtyService } from '../../services/specialty.service.js';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agregar-editar-specialty',
  templateUrl: './agregar-editar-specialty.component.html',
  styleUrl: './agregar-editar-specialty.component.css'
})
export class AgregarEditarSpecialtyComponent implements OnInit {

  form: FormGroup;
  loading : boolean = false;
  operation: string = 'Agregar ';
  id : number | undefined;

  constructor(public dialogRef: MatDialogRef<AgregarEditarSpecialtyComponent>,
    private fb: FormBuilder, private _specialtyService: SpecialtyService
    , private _snackBar :MatSnackBar
    , @Inject(MAT_DIALOG_DATA) public data: any) {
      this.form = this.fb.group({
        code: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
        name: ['', [Validators.required, Validators.maxLength(20)]]
      })
      this.id = data.id;
     }

  ngOnInit(): void {
    this.isEdit(this.id);
  }

  isEdit(id: number | undefined){
    if(id !== undefined){
      this.operation = 'Editar ';
      this.getSpecialty(id);
    }
  }

  getSpecialty(id: number){
    this._specialtyService.getSpecialty(id).subscribe(data => {
      console.log(data);
      this.form.patchValue({
        code: data.code,
        name: data.name
      })
    })
  }


  cancelar(){
    this.dialogRef.close(false);
  }

  addEditSpecialty() {

    const aSpecialty: Specialty = {
      code: this.form.value.code,
      name: this.form.value.name
    }

    this.loading = true;


    if(this.id === undefined){
      //es agregar
      this._specialtyService.addSpecialty(aSpecialty).subscribe(() => {
        this.successMessage('agregada');
      });

    }else {
      // es editar
      this._specialtyService.updateSpecialty(this.id, aSpecialty).subscribe(data => {
        this.successMessage('actualizada');
      });
    }

    this.loading = false;
    this.dialogRef.close(true);

  }

  successMessage(operation: string){
    this._snackBar.open(`La especialidad fue ${operation} con exito`,"" ,{
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

}
