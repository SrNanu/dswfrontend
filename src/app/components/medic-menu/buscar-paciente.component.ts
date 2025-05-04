import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-buscar-paciente',
  templateUrl: './buscar-paciente.component.html',
  styleUrls: ['./buscar-paciente.component.css']
})
export class BuscarPacienteComponent {
  dni: string = '';
  error: boolean = false;
  errorDeDNI: boolean = false;

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
