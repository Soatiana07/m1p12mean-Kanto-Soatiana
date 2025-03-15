import { Component, OnInit } from '@angular/core';
import { CardComponent } from "../../theme/shared/components/card/card.component";
import { MarqueVoitureService } from 'src/app/services/Manager/marque-voiture.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-marque-voiture',
  imports: [CardComponent, CommonModule, HttpClientModule, FormsModule],
  templateUrl: './marque-voiture.component.html',
  styleUrl: './marque-voiture.component.scss',
  providers: [MarqueVoitureService]
})
export class MarqueVoitureComponent implements OnInit { // ✅ Implémentation de OnInit

  marques: any[] = []; // ✅ Initialisation correcte
  newMarque = { marque: '', note: '',};
  constructor(private marqueService: MarqueVoitureService) { }

  ngOnInit(): void { // ✅ Plus de warning ESLint
    console.log('hey');
    this.loadMarque();
  }

  loadMarque(): void {
    console.log('ito eeee');
    this.marqueService.getMarque().subscribe(data => this.marques = data);
  }

  addMarque(): void {
    const formData = new FormData();

    if (this.newMarque.marque && this.newMarque.note) {
        formData.append('marque', this.newMarque.marque);
        formData.append('note', this.newMarque.note);

        console.log('Contenu de FormData :');


    } else {
        console.log("Une des valeurs est undefined ou null !");
    }



    console.log(formData);
    this.marqueService.addMarque(this.newMarque.marque,this.newMarque.note).subscribe(() => {
      this.loadMarque(); // Recharge la liste après ajout
      this.newMarque = { marque: '', note: '' }; // Réinitialise le formulaire

    });


  }
}
