import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceService } from 'src/app/services/Manager/service.service';
import { HeaderProfilComponent } from "../header-profil/header-profil.component";
import { FooterProfilComponent } from "../footer-profil/footer-profil.component";
import { CategorieServiceService } from 'src/app/services/Manager/categorie-service.service';
import { VoitureClientService } from 'src/app/services/Client/voiture-client.service';
declare let bootstrap: any;

@Component({
  selector: 'app-acceuil',
  imports: [CommonModule,
    HttpClientModule,
    FormsModule, HeaderProfilComponent, FooterProfilComponent],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.scss',
  providers: [ServiceService,CategorieServiceService, VoitureClientService]
})
export class AcceuilComponent {
  constructor(private serviceService: ServiceService,
    private categorieService : CategorieServiceService
  ) { }

  categories: any[] = [];

  ngOnInit(): void {
    this.loadCategorie();
  }


  loadCategorie(): void {
    console.log('ito eeee');
    this.categorieService.getCategorieService().subscribe(data => this.categories = data);
  }

  services = [
    { img: "https://source.unsplash.com/400x300/?car-repair", title: "Réparations", text: "Nous réparons toutes les marques de voitures avec expertise." },
    { img: "https://source.unsplash.com/400x300/?car-maintenance", title: "Entretien", text: "Gardez votre voiture en parfait état avec notre service d'entretien." },
    { img: "https://source.unsplash.com/400x300/?tire", title: "Changement de pneus", text: "Nous proposons un large choix de pneus adaptés à votre véhicule." },
    { img: "https://source.unsplash.com/400x300/?oil", title: "Vidange", text: "Service de vidange rapide et efficace." },
    { img: "https://source.unsplash.com/400x300/?battery", title: "Batteries", text: "Remplacement et vérification des batteries." },
    { img: "https://source.unsplash.com/400x300/?brakes", title: "Freins", text: "Entretien et remplacement des freins." }
  ];

  currentIndex = 0;
  categoriesPerPage = 3;


  get visibleCategorie() {
    return this.categories.slice(this.currentIndex, this.currentIndex + this.categoriesPerPage);
  }

  next() {
    if (this.currentIndex + this.categoriesPerPage < this.categories.length) {
      this.currentIndex += this.categoriesPerPage;
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex -= this.categoriesPerPage;
    }
  }


}
