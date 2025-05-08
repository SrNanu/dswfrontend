import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { UserBase } from '../../interfaces/userBase';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  hidePassword = true;
  loading = false;
  loginError: string | null = null;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private _snackBar: MatSnackBar
  ) {}

  submit() {
    this.loginError = null;
    if (this.form.invalid) {
      this._snackBar.open('Por favor, complete todos los campos', 'Cerrar', {
        duration: 3000,
        panelClass: ['snackbar-error'],
      });
      return;
    }

    this.loading = true;

    const user: UserBase = {
      username: this.form.value.username,
      password: this.form.value.password,
    };

    this.loginService.logIn(user).subscribe({
      next: (data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);

        this._snackBar.open(`El usuario ${user.username} fue logueado`, 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-success'],
        });
        
        this.redirectUser(data.role);
        this.loading = false;
      },
      error: (err) => {
        this.loginError = 'Usuario o contraseña incorrectos';
        this.loading = false;
        
        // Solo marcamos el campo de contraseña como inválido
        this.form.get('password')?.setErrors({ incorrect: true });
        this.form.get('password')?.markAsTouched();
        
        let errorMessage = 'Usuario o contraseña incorrectos';
        if (err.status === 0) {
          errorMessage = 'No se pudo conectar con el servidor. Intente nuevamente.';
        }
        
        this._snackBar.open(errorMessage, 'Cerrar', {
          duration: 3000,
          panelClass: ['snackbar-error'],
        });
      },
    });
  }

  // Limpia el error específico cuando se edita el campo
  clearFieldError(controlName: string) {
    const control = this.form.get(controlName);
    if (control?.errors?.['incorrect']) {
      control.setErrors(null);
      control.updateValueAndValidity();
    }
    this.loginError = null;
  }

  private redirectUser(role: string): void {
    if (role === 'secretary') {
      this.router.navigate(['/otorgarturno']);
    } else if (role === 'medic') {
      this.router.navigate(['/buscar-paciente']);
    } else {
      this._snackBar.open('Rol de usuario no reconocido', 'Cerrar', {
        duration: 3000,
        panelClass: ['snackbar-error'],
      });
    }
  }
}