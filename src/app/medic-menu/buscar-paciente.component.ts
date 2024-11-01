import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar-paciente',
  templateUrl: './buscar-paciente.component.html',
  styleUrls: ['./buscar-paciente.component.css']
})
export class BuscarPacienteComponent {
  dni: string = '';

  constructor(private router: Router) {}

  buscarPaciente(): void {
    if (this.dni) {
      this.router.navigate(['/hc-paciente', this.dni]);
    }
  }
}
