import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Patient {
  id: number;
  name: string;
  dni: string;
  healthInsurance: string;
}

interface Attention {
  id: number;
  date: string;
  details: string;
}

@Component({
  selector: 'app-paciente-detalle',
  templateUrl: './hc-paciente.component.html',
  styleUrls: ['./hc-paciente.component.css']
})
export class HCPacienteComponent implements OnInit {
  patientInfo: { label: string, value: string }[] = [];
  attentionList: { date: string, details: string }[] = [];
  dni: string = '';
  hasAttentions: boolean = true;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.dni = this.route.snapshot.paramMap.get('dni') || '';
    this.loadPatientData();
  }

  loadPatientData(): void {
    this.http.get<{ message: string; data: Patient }>(`/api/patients/dni/${this.dni}`).subscribe(
      response => {
        const patient = response.data;
        this.patientInfo = [
          { label: 'Nombre', value: patient.name },
          { label: 'DNI', value: patient.dni },
          { label: 'Seguro de Salud', value: patient.healthInsurance },
        ];
        this.loadPatientAttentions();
      },
      error => {
        console.error('Error fetching patient data:', error);
      }
    );
  }

  loadPatientAttentions(): void {
    this.http.get<{ message: string; data: Attention[] }>(`/api/attentions/dni/${this.dni}`).subscribe(
      response => {
        this.attentionList = response.data.map(attention => ({
          date: attention.date,
          details: attention.details,
        }));
        this.hasAttentions = this.attentionList.length > 0;
      },
      error => {
        console.error('Error fetching attentions data:', error);
        this.hasAttentions = false;
      }
    );
  }
}
