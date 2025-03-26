import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DemandeDevisService } from 'src/app/services/Client/demande-devis.service';
import { DetailDemandeDevisService } from 'src/app/services/Client/detail-demande-devis.service';
import { VoitureClientService } from 'src/app/services/Client/voiture-client.service';
import { ServiceService } from 'src/app/services/Manager/service.service';
declare let bootstrap: any;
@Component({
  selector: 'app-header-profil',
  imports: [CommonModule,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './header-profil.component.html',
  styleUrl: './header-profil.component.scss',
  providers: [ServiceService,
    VoitureClientService,
    DemandeDevisService,
    DetailDemandeDevisService
  ]
})
export class HeaderProfilComponent {
constructor(private serviceService: ServiceService,
  private voitureService: VoitureClientService,
  private demandeDevisService : DemandeDevisService,
  private detailDemandeService : DetailDemandeDevisService
) { }

  openDemandeDevis() {
    const modalElement = document.getElementById('demandeDevisModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  service: string = '';
  serviceSuggestions: any[] = [];
  nombre : number=1;
  idService: string = '';
  serviceSelectionnee: any = null;

  searchService() {
    if (this.service.length > 1) {
      this.serviceService.searchService(this.service).subscribe(
        (data) => {
          this.serviceSuggestions = data;
        },
        (error) => {
          console.error('Erreur lors de la recherche:', error);
        }
      );
    } else {
      this.serviceSuggestions = [];
    }
  }

  selectSuggestion(service: any) {
    this.service = service.nomService;
    this.idService = service._id;
    this.serviceSelectionnee= service.nomService;
    this.serviceSuggestions = [];
  }

  serviceAjoutees: any[] = [];
  ajouterService() {
    if (!this.service) {
      alert('Veuillez remplir tous les champs avant d’ajouter.');
      return;
    }

    this.serviceAjoutees.push({
      service: this.service,
      nombre: this.nombre,
      idService: this.idService
    });


    this.service = '';
    this.idService = '';
    this.nombre = 1;
  }


  supprimerService(index: number) {
    this.serviceAjoutees.splice(index, 1);
  }


  ngOnInit(): void {
    this.loadVoitureByClient();
  }

  listeVoitures: any[] = [];
  loadVoitureByClient(): void {
    this.voitureService.getVoitureByClient("67e006a23bb8e24349f2ab66").subscribe(data => this.listeVoitures = data);
  }

  demandeDevis = { dateDemande: '', idVoitureClient: '' };

  addDemandeDevis(): void {
    this.demandeDevisService.addDemandeDevis(this.demandeDevis.dateDemande, this.demandeDevis.idVoitureClient, this.serviceAjoutees).subscribe(() => {
      const modalElement = document.getElementById('demandeEnvoye');
      if (modalElement) {
        const modalInstance = new bootstrap.Modal(modalElement);
        modalInstance.show();
      }
      this.demandeDevis = { dateDemande: '', idVoitureClient: '' };
      this.serviceAjoutees = [];

    });
  }

}
