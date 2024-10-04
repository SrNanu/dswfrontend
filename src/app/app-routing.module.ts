import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPatientsComponent } from './components/list-patient/list.patient.component';
import { ListSecretarysComponent } from './components/list-secretary/list-secretary.component';
import { ListMedicsComponent } from './components/list-medics/list-medics.component';
import { ListSpecialtyComponent } from './components/list-specialty/list-specialty.component';
const routes: Routes = [
  { path: 'patient', component: ListPatientsComponent },
  { path: 'secretary', component: ListSecretarysComponent },
  { path: 'medic', component: ListMedicsComponent },
  { path: 'specialty', component: ListSpecialtyComponent },
  { path: '', redirectTo: '/patient', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
