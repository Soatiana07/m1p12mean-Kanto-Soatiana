import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AnneeVoitureService } from 'src/app/services/Manager/annee-voiture.service';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';

@Component({
  selector: 'app-annee-voiture',
  imports: [CardComponent, CommonModule, HttpClientModule, FormsModule],
  templateUrl: './annee-voiture.component.html',
  styleUrl: './annee-voiture.component.scss',
  providers: [AnneeVoitureService]
})
export class AnneeVoitureComponent implements OnInit {
  annees: any[] = []; // ✅ Initialisation correcte
  newAnnee = { annee: '', note: '',};
  isEditing = false; // Indicateur de modification
  anneeEnCours: any = null; // Stocke l'année à modifier
  constructor(private anneeService: AnneeVoitureService) { }

  ngOnInit(): void {
    this.loadAnnee();
    // throw new Error('Method not implemented.');
  }

  // Liste
  loadAnnee(): void {
    console.log('ito eeee');
    this.anneeService.getAnnee().subscribe(data => this.annees = data);
  }

  // Ajout
  addAnnee(): void {
    const formData = new FormData();

    if (this.newAnnee.annee && this.newAnnee.note) {
        formData.append('annee', this.newAnnee.annee);
        formData.append('note', this.newAnnee.note);

        console.log('Contenu de FormData :');


    } else {
        console.log("Une des valeurs est undefined ou null !");
    }

    console.log(formData);
    this.anneeService.addAnnee(this.newAnnee.annee,this.newAnnee.note).subscribe(() => {
      this.loadAnnee(); // Recharge la liste après ajout
      this.newAnnee = { annee: '', note: '' }; // Réinitialise le formulaire
    });
  }

  // Suppression d'une année
  deleteAnnee(id: string): void {
    if (confirm("Voulez-vous vraiment supprimer cette année ?")) {
      this.anneeService.deleteAnnee(id).subscribe(() => {
        this.loadAnnee(); // Recharge la liste après suppression
      });
    }
  }

  // Préparer l'édition d'une année
  editAnnee(annee: any): void {
    this.newAnnee = { ...annee }; // Remplit le formulaire avec les données existantes
    this.isEditing = true;
  }

  // Mise à jour d'une année
  updateAnnee(id: string, annee: any): void {
    if (id) {
      this.anneeService.updateAnnee(id,annee).subscribe(() => {
        this.loadAnnee();
        this.newAnnee = { annee: '', note: '' }; // Réinitialisation
        this.isEditing = false;
      });
    }
  }

  cancelEdit(): void {
    this.newAnnee = { annee: '', note: '' };
    this.anneeEnCours = null;
    this.isEditing = false;
  }
}
