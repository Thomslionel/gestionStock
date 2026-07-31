import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core'; // <-- 1. Importer ChangeDetectorRef
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { LoginRequest } from '../../interfaces/LoginRequest';
import { Auth } from '../../core/services/auth';
import { Token } from '../../core/services/token';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  hidePassword = true;
  loading = false;
  errorMessage = '';
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private tokenService: Token,
    private router: Router,
    private cdr: ChangeDetectorRef // <-- 2. Injecter ChangeDetectorRef ici
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  connexion(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    
    this.loading = true;
    this.errorMessage = ''; // Réinitialiser l'erreur précédente

    this.authService.login(this.loginForm.value as LoginRequest)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.loading = false;
          this.tokenService.save(
            response.data.bearer,
            response.data.refresh
          );
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage =
            err.error?.message ?? 'Identifiant ou mot de passe incorrect.';
          
          this.cdr.detectChanges(); // <-- 3. Forcer la mise à jour de l'UI en cas d'erreur
        }
      });
  }
}