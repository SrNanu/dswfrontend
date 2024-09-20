import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPatientsComponent } from './components/list-patient/list.patient.component';
import { ListSecretarysComponent } from './components/list-secretary/list-secretary.component';
const routes: Routes = [
  { path: 'patient', component: ListPatientsComponent },
  { path: 'secretary', component: ListSecretarysComponent },
  { path: '', redirectTo: '/patient', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
