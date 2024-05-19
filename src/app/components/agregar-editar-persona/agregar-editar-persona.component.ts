import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-editar-persona',
  templateUrl: './agregar-editar-persona.component.html',
  styleUrl: './agregar-editar-persona.component.css'
})
export class AgregarEditarPersonaComponent {


  tipoDocumento: string[] = ['DNI', 'Libreta Civica', 'Pasaporte'];
  constructor(public dialogRef: MatDialogRef<AgregarEditarPersonaComponent>,){
    
  }

  cancelar(){
    this.dialogRef.close();
  }

}
