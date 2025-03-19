import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FournisseurService } from 'src/app/services/Manager/fournisseur.service';
import { CardComponent } from "../../theme/shared/components/card/card.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
declare let bootstrap: any;

@Component({
  selector: 'app-fournisseur',
  standalone: true,
  imports: [
    CardComponent,
    CommonModule,
    FormsModule,
    HttpClientModule,  // Assurez-vous que HttpClientModule est importé ici.
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.scss'],
   providers: [FournisseurService]
})
export class FournisseurComponent implements OnInit {
  paysSuggestions: any[] = [];
  query: string = '';
  fournisseur = { nom:'', siteweb: '', pays: '', adresse:'', telephone:'', mail:'', etat:''};

  constructor(private fournisseurService: FournisseurService) { }

  ngOnInit(): void { }

  searchPays() {
    if (this.query.length > 2) {
      this.fournisseurService.searchPays(this.query).subscribe(
        (data) => {
          this.paysSuggestions = data;
        },
        (error) => {
          console.error('Erreur lors de la recherche:', error);
        }
      );
    } else {
      this.paysSuggestions = [];
    }
  }


  selectSuggestion(pays: any) {
    this.query = pays.nom_fr_fr;
    this.paysSuggestions = [];
  }

  openAddModal() {
    const modalElement = document.getElementById('ajoutModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  addFournisseur(): void {
    this.fournisseurService.addFournisseur(this.fournisseur.nom, this.fournisseur.siteweb,this.fournisseur.adresse,this.fournisseur.pays,this.fournisseur.telephone,this.fournisseur.mail,this.fournisseur.etat).subscribe(() => {

      this.fournisseur = {nom:'', siteweb: '', pays: '', adresse:'', telephone:'', mail:'', etat:''};

    });
  }


}
