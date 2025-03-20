import { Component } from '@angular/core';
import { CardComponent } from "../../theme/shared/components/card/card.component";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EntreePieceService } from 'src/app/services/Manager/entree-piece.service';
import { StockPieceService } from 'src/app/services/Manager/stock-piece.service';
declare let bootstrap: any;
@Component({
  selector: 'app-sortie-piece',
  imports: [CardComponent,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './sortie-piece.component.html',
  styleUrl: './sortie-piece.component.scss',
  providers: [EntreePieceService,StockPieceService]
})
export class SortiePieceComponent {
  constructor(private entreeService: EntreePieceService,
    stockPieceService: StockPieceService,
  ) { }
  pieceSuggestions: any[] = [];
  piece: string = '';
  pieceSelectionnee: any = null;
  idPiece: string = '';
  prixUnitaire: string = '';
  nombre: string = '';
  margeBeneficiaire: string = '';
  piecesAjoutees: any[] = [];

  openAddModal() {
    const modalElement = document.getElementById('ajoutModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

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

  selectSuggestionPiece(piece1: any) {
    this.piece = piece1.nomPiece + "(" + piece1.referencePiece + ")";
    this.idPiece = piece1._id;
    this.pieceSelectionnee = piece1.nomPiece;
    this.pieceSuggestions = [];
  }

  ajouterPiece() {
    if (!this.piece || !this.prixUnitaire || !this.nombre || !this.margeBeneficiaire) {
      alert('Veuillez remplir tous les champs avant d’ajouter.');
      return;
    }
    this.piecesAjoutees.push({
      piece: this.piece,
      idPiece: this.idPiece,
      prixUnitaire: this.prixUnitaire,
      nombre: this.nombre
    });
  }


  supprimerPiece(index: number) {
    this.piecesAjoutees.splice(index, 1);
  }



}
