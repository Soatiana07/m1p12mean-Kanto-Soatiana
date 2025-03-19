import { Component } from '@angular/core';
import { CardComponent } from "../../theme/shared/components/card/card.component";
import { EntreePieceService } from 'src/app/services/Manager/entree-piece.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
declare let bootstrap: any;

@Component({
  selector: 'app-entree-piece',
  standalone: true,
  imports: [CardComponent,
    HttpClientModule,
    FormsModule,
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './entree-piece.component.html',
  styleUrl: './entree-piece.component.scss',
  providers: [EntreePieceService]
})
export class EntreePieceComponent {
  constructor(private entreeService: EntreePieceService) { }

  query: string = '';
  idFournisseur: string = '';
  fournisseurSuggestions: any[] = [];
  pieceSuggestions: any[] = [];
  piece: string = '';
  idPiece: string = '';

  prixUnitaire: string = '';
  nombre: string = '';
  margeBeneficiaire: string = '';
  dateExpiration: string = '';

  entreePi = { dateEntree: '', idFournisseur: '', numeroBl: '', commentaire: '' };

  piecesAjoutees: any[] = [];

  ngOnInit(): void {
    console.log(this,this.piecesAjoutees);
  }

  openAddModal() {
    const modalElement = document.getElementById('ajoutModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  searchFournisseur() {
    if (this.query.length > 1) {
      this.entreeService.searchFournisseur(this.query).subscribe(
        (data) => {
          this.fournisseurSuggestions = data;
        },
        (error) => {
          console.error('Erreur lors de la recherche:', error);
        }
      );
    } else {
      this.fournisseurSuggestions = [];
    }
  }

  selectSuggestion(fournisseur: any) {
    this.query = fournisseur.nom;
    this.idFournisseur = fournisseur._id;
    this.fournisseurSuggestions = [];
  }

  pieceSelectionnee: any = null; // Stocke la pièce sélectionnée depuis la suggestion

searchPiece() {
  if (this.piece.length > 1) {
    this.entreeService.searchPiece(this.piece).subscribe(
      (data) => {
        this.pieceSuggestions = data;
      },
      (error) => {
        console.error('Erreur lors de la recherche:', error);
      }
    );
  } else {
    this.pieceSuggestions = [];
  }
}

selectSuggestionPiece(piece: any) {
  this.piece = piece.nomPiece;
  this.idPiece = piece._id;
  this.pieceSelectionnee = piece; // Met à jour la pièce sélectionnée
  this.pieceSuggestions = [];
}

ajouterPiece() {
  if (!this.piece || !this.prixUnitaire || !this.nombre || !this.margeBeneficiaire || !this.dateExpiration) {
    alert('Veuillez remplir tous les champs avant d’ajouter.');
    return;
  }

  this.piecesAjoutees.push({
    piece: this.piece,
    idPiece: this.idPiece,
    prixUnitaire: this.prixUnitaire,
    nombre: this.nombre,
    margeBeneficiaire: this.margeBeneficiaire,
    dateExpiration: this.dateExpiration
  });

  // Réinitialiser les champs après l'ajout
  this.piece = '';
  this.idPiece = '';
  this.pieceSelectionnee = null; // Réinitialise la pièce sélectionnée
  this.prixUnitaire = '';
  this.nombre = '';
  this.margeBeneficiaire = '';
  this.dateExpiration = '';
}

  supprimerPiece(index: number) {
    this.piecesAjoutees.splice(index, 1);
  }


}
