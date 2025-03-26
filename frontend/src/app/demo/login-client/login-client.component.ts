import { Component } from '@angular/core';
import { CardComponent } from "../../theme/shared/components/card/card.component";
import { LoginClientService } from 'src/app/services/Client/login-client.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule, Router } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';


@Component({
  selector: 'app-login-client',
  imports: [
    HttpClientModule,
    FormsModule,
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule
  ],
  templateUrl: './login-client.component.html',
  styleUrl: './login-client.component.scss',
  providers :[LoginClientService, Router, AuthGuard]
})
export class LoginClientComponent {
  email: string = '';
  mdp: string = '';
  errorMessage: string = '';

  constructor(
    private loginclientService: LoginClientService,
    private router : Router
  ) {}

  // Login
  login() {
    if (this.email && this.mdp) {
      this.loginclientService.login(this.email, this.mdp).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token); // Enregistrer le token dans localStorage
          console.log('Client connecté:', response.client);
          this.router.navigate(['/employe']);
        },
        error: (err) => {
          this.errorMessage = err.error.error || 'Erreur lors de la connexion';
        }
      });
    } else {
      this.errorMessage = 'Email et mot de passe sont requis';
    }
  }

}
