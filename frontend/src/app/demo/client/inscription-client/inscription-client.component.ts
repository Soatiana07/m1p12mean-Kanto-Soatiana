import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { InscriptionClientService } from 'src/app/services/Client/inscription-client.service';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';

@Component({
  selector: 'app-inscription-client',
  standalone: true,
  imports: [
    CardComponent,
    HttpClientModule,
    FormsModule,
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule
  ],
  templateUrl: './inscription-client.component.html',
  styleUrl: './inscription-client.component.scss',
  providers: [InscriptionClientService]
})
export class InscriptionClientComponent {
  newClient: any = {
    nom: '',
    adresse: '',
    telephone: '',
    email: '',
    mdp: ''
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private inscriptionService: InscriptionClientService) {}

  // Vérifie que tous les champs requis sont remplis
  private allFieldsValid(): boolean {
    return (
      this.newClient.nom &&
      this.newClient.telephone &&
      this.newClient.email &&
      this.newClient.mdp
    );
  }

  // Ajout nouveau client
  addClient() {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.allFieldsValid()) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    this.inscriptionService.addClient(this.newClient).subscribe({
      next: () => {
        this.successMessage = 'Inscription réussie ! Bienvenue 👋';
        this.newClient = {
          nom: '',
          adresse: '',
          telephone: '',
          email: '',
          mdp: ''
        };
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de l’inscription. Réessayez plus tard.';
        console.error('Erreur API :', err);
      }
    });
  }
}
