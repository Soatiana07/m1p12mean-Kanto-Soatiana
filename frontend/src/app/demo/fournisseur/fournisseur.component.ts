import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';  // Ajoutez cela
import { CardComponent } from "../../theme/shared/components/card/card.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FournisseurService } from 'src/app/services/Manager/fournisseur.service';
declare let bootstrap: any;

@Component({
  selector: 'app-fournisseur',
  standalone: true, // 📌 Permet d'utiliser ce composant seul
  imports: [
    CardComponent,
    CommonModule,
    FormsModule,
    HttpClientModule // Ajoutez HttpClientModule ici aussi
  ],
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.scss']
})
export class FournisseurComponent implements OnInit {

  paysSuggestions: any[] = [];  // Tableau pour stocker les suggestions
  query: string = '';  // Variable pour la saisie de l'utilisateur

  constructor(private fournisseurService: FournisseurService) { }

  ngOnInit(): void {}

  // Fonction pour rechercher les pays
  searchPays() {
    if (this.query.length > 2) {  // On commence la recherche après 3 caractères
      this.fournisseurService.searchPays(this.query).subscribe(
        (data) => {
          this.paysSuggestions = data; // Assigner les résultats à la variable
        },
        (error) => {
          console.error('Erreur lors de la recherche:', error);
        }
      );
    } else {
      this.paysSuggestions = [];  // Vider les suggestions si la saisie est trop courte
    }
  }

  // Fonction pour gérer la sélection d'une suggestion
  selectSuggestion(pays: any) {
    this.query = pays.nom_fr_fr;  // Remplir le champ avec le nom du pays sélectionné
    this.paysSuggestions = [];  // Vider les suggestions
  }

  // Ouvrir le modal pour ajouter un fournisseur
  openAddModal() {
    const modalElement = document.getElementById('ajoutModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }
}
