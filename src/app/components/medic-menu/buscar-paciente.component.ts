import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from '../../services/patient.service';
<<<<<<< HEAD
=======
import { Patient } from '../../interfaces/patient';
>>>>>>> upstream/master

@Component({
  selector: 'app-buscar-paciente',
  templateUrl: './buscar-paciente.component.html',
  styleUrls: ['./buscar-paciente.component.css']
})
export class BuscarPacienteComponent {
  dni: string = '';
  error: boolean = false;
  errorDeDNI: boolean = false;
<<<<<<< HEAD

  constructor(private router: Router, private _PatientService: PatientService)
  {
  }

  buscarPaciente(): void {
    if (this.dni) {

      this._PatientService.getPatientByDni(this.dni).subscribe(response => {
        console.log(response.dni); //Ve si llego un paciente (osea no es null)
        if(response)
          {
            this.router.navigate(['/hc-paciente', response.dni ]);
          }
        else
        {
          this.errorDeDNI = true;
        }
      });
    }
    else
    {
      this.error = true;
    }

  }

}
=======
  pacientesFiltrados: Patient[] = [];
  mostrarSugerencias: boolean = false;

  constructor(private router: Router, private _PatientService: PatientService) {}

  filtrarPacientes(): void {
    if (this.dni.length >= 2) {
      this._PatientService.getPatients().subscribe(pacientes => {
        this.pacientesFiltrados = pacientes.filter(paciente => 
          paciente.dni.toLowerCase().includes(this.dni.toLowerCase()) ||
          paciente.firstname.toLowerCase().includes(this.dni.toLowerCase()) ||
          paciente.lastname.toLowerCase().includes(this.dni.toLowerCase())
        );
        this.mostrarSugerencias = true;
      });
    } else {
      this.pacientesFiltrados = [];
      this.mostrarSugerencias = false;
    }
  }

  seleccionarPaciente(paciente: Patient): void {
    this.dni = paciente.dni;
    this.mostrarSugerencias = false;
    this.router.navigate(['/hc-paciente', paciente.dni]);
  }

  buscarPaciente(): void {
    if (!this.dni) {
      this.error = true;
      return;
    }

    this._PatientService.getPatientByDni(this.dni).subscribe({
      next: (response) => {
        if (response) {
          this.router.navigate(['/hc-paciente', response.dni]);
        } else {
          this.errorDeDNI = true;
        }
      },
      error: () => {
        this.errorDeDNI = true;
      }
    });
  }
}
>>>>>>> upstream/master
