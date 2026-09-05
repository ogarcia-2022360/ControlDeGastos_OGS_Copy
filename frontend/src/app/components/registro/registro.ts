import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

declare const google: any;

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css']
})
export class RegistroComponent implements OnInit {
  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  password: string = '';
  mostrarPassword: boolean = false;
  errorMensaje: string = '';

  get errorMessage(): string { return this.errorMensaje; }
  set errorMessage(val: string) { this.errorMensaje = val; }

  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.inicializarGoogleAuth();
  }

  inicializarGoogleAuth(): void {
    if (typeof google !== 'undefined' && google.accounts) {
      google.accounts.id.initialize({
        client_id: 'TU_CLIENT_ID_DE_GOOGLE.apps.googleusercontent.com',
        callback: (response: any) => this.handleGoogleCredential(response)
      });

      const btnContainer = document.getElementById('googleRegisterBtn');
      if (btnContainer) {
        google.accounts.id.renderButton(btnContainer, {
          theme: 'outline',
          size: 'large'
        });
      }
    }
  }

  handleGoogleCredential(response: any): void {
    const idToken = response.credential;
    this.authService.loginWithGoogle(idToken).subscribe({
      next: (res: any) => {
        this.ngZone.run(() => {
          this.router.navigate(['/dashboard']);
        });
      },
      error: (err: any) => {
        this.errorMensaje = 'Error al registrar con Google';
      }
    });
  }

  onRegister(): void {
    this.onRegistro();
  }

  onRegistro(): void {
    if (!this.nombre || !this.correo || !this.password) {
      this.errorMensaje = 'Por favor completa todos los campos';
      return;
    }

    const userData = {
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      password: this.password
    };

    this.authService.register(userData).subscribe({
      next: (res: any) => {
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        this.errorMensaje = err.error?.message || 'Error al registrar usuario';
      }
    });
  }
}