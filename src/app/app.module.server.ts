import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module';  // Asegúrate de que la ruta sea correcta
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,
    ServerModule
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule { }
