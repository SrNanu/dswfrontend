import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPatientsComponent } from './components/list-patient/list.patient.component';
import { ListSecretarysComponent } from './components/list-secretary/list-secretary.component';
import { ListMedicsComponent } from './components/list-medics/list-medics.component';
import { ListSpecialtyComponent } from './components/list-specialty/list-specialty.component';
import { ListHealthInsuranceComponent } from './components/list-healthInsurance/list-healthInsurance.component';
import { ListConsultationHoursComponent } from './components/list-consultationHours/list-consultationHours.component';
import { LoginComponent } from './components/login/login.component';
import { OtorgarTurnoComponent } from './components/otorgar-turno/otorgar-turno.component.js';
import { MenuComponent } from './menu/menu.component';
import { MedicMenuComponent } from './medic-menu/med-menu.component';
import { SelectJobComponent } from './select-job/sel-job.component';
import { HCPacienteComponent } from './medic-menu/hc-paciente.component';
import { BuscarPacienteComponent } from './medic-menu/buscar-paciente.component';

const routes: Routes = [
  { path: 'patient', component: ListPatientsComponent },
  { path: 'secretary', component: ListSecretarysComponent },
  { path: 'medic', component: ListMedicsComponent },
  { path: 'specialty', component: ListSpecialtyComponent },
  { path: 'healthInsurance', component: ListHealthInsuranceComponent },
  { path: 'consultationhours', component: ListConsultationHoursComponent },
  { path: 'otorgarturno', component: OtorgarTurnoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'med-menu', component: MedicMenuComponent },
  { path: 'sel-job', component: SelectJobComponent },
  { path: 'hc-paciente', component: HCPacienteComponent },
  { path: 'buscar-paciente', component: BuscarPacienteComponent },
  { path: '', redirectTo: '/sel-job', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
