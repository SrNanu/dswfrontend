import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

//Components
import { AppComponent } from './app.component';
import { ListSecretarysComponent } from './components/list-secretary/list-secretary.component';
import { AgregarEditarSecretaryComponent } from './components/agregar-editar-secretary/agregar-editar-secretary.component';

//Modulos
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    ListSecretarysComponent,
    AgregarEditarSecretaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
