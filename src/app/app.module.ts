import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

//Components
import { AppComponent } from './app.component';
import { ListSecretarysComponent } from './components/list-secretary/list-secretary.component';
import { AgregarEditarSecretaryComponent } from './components/agregar-editar-secretary/agregar-editar-secretary.component';
import { AgregarEditarPatientComponent } from './components/agregar-editar-paciente/agregar-editar-paciente.component';
import { ListPatientsComponent } from './components/list-patient/list.patient.component';
import { MenuComponent } from './menu/menu.component';
import { ListSpecialtyComponent } from './components/list-specialty/list-specialty.component';
import { AgregarEditarSpecialtyComponent } from './components/agregar-editar-specialty/agregar-editar-specialty.component';
import { ListMedicsComponent } from './components/list-medics/list-medics.component';
import { AddEditMedicComponent } from './components/add-edit-medic/add-edit-medic.component';
import { AgregarEditarHealthInsuranceComponent } from './components/agregar-editar-healthInsurance/agregar-editar-healthInsurance.component';
import { ListHealthInsuranceComponent } from './components/list-healthInsurance/list-healthInsurance.component';
import { MedicMenuComponent } from './medic-menu/med-menu.component';
import { BuscarPacienteComponent } from './medic-menu/buscar-paciente.component';
import { SelectJobComponent } from './select-job/sel-job.component';

//Modulos
import { SharedModule } from './shared/shared.module';
import { AgregarEditarConsultationHoursComponent } from './components/agregar-editar-consultationHours/agregar-editar-consultationHours.component';
import { LoginComponent } from './components/login/login.component';
import { OtorgarTurnoComponent } from './components/otorgar-turno/otorgar-turno.component';
import { ListConsultationHoursComponent } from './components/list-consultationHours/list-consultationHours.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ListSecretarysComponent,
    AgregarEditarSecretaryComponent,
    AgregarEditarPatientComponent,
    ListPatientsComponent,
    MenuComponent,
    ListSpecialtyComponent,
    AgregarEditarSpecialtyComponent,
    ListMedicsComponent,
    AddEditMedicComponent,
    AgregarEditarHealthInsuranceComponent,
    AgregarEditarConsultationHoursComponent,
    ListConsultationHoursComponent,
    LoginComponent,
    OtorgarTurnoComponent,
    ListHealthInsuranceComponent,
    MedicMenuComponent,
    BuscarPacienteComponent,
    SelectJobComponent
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    MatProgressSpinnerModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
