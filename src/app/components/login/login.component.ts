import {  Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { UserBase } from '../../interfaces/userBase';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
hidePassword: any;
  constructor(private router: Router
    , private loginService: LoginService
    , private _snackBar: MatSnackBar
  ) {}
loading = false;
  submit() {
    //if (this.form.valid) { no se para que era
    this.loading = true;
    // validamos que ingrese valores
    if (this.form.value.username === '' || this.form.value.password === '') {
      alert('Ingrese un usuario y contraseña');
      return;
    }
    
    // Creamos el usuario
    const user: UserBase = { 
      username: this.form.value.username,
      password: this.form.value.password
    };
    // Llamar al servicio de login
     this.loginService.logIn(user).subscribe({
      next: (data) => {
        // Guardar el token y el rol en el almacenamiento local
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        console.log("Token: " + data.token);
        //Mensaje en vez de alerta
        this._snackBar.open(`El usuario ${user.username} fue logueado`, 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-success']  // Agregar clase personalizada
        });
        
        // Redirigir al usuario según su rol
        if (data.role === 'secretary') {
          this.router.navigate(['/otorgarturno']);
          console.log('Se redirige a la vista de secretaria');
        } else if (data.role === 'medic') {
          this.router.navigate(['/buscar-paciente']);
        } else {
          alert('Rol de usuario no reconocido');
        }
        this.loading = false;
      
      },
      error: (err) => {
        console.error('Error en el login', err);
        //alert('Usuario o contraseña incorrectos');
        this._snackBar.open(`Usuario o contraseña incorrectos `, 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-success']  // Agregar clase personalizada
        });
        this.loading = false;

      }
    });
   
  }
}
