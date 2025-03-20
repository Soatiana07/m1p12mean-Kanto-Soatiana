import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategorieServiceService } from 'src/app/services/Manager/categorie-service.service';
import { ServiceService } from 'src/app/services/Manager/service.service';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';

declare let bootstrap: any;
@Component({
  selector: 'app-service',
  standalone : true,
  imports: [CardComponent, CommonModule, HttpClientModule, FormsModule],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss',
  providers: [ServiceService]
})
export class ServiceComponent implements OnInit {
  categories: any[] = [];
  services: any[] = [];
  newService = {idCategorie: '', nomService: '', prixBase: ''};
  selectedService: any = {};
  constructor(
    private serviceService: ServiceService) { }

  // ngOnInit(): void {
  //   this.loadService();
  // }
  ngOnInit(): void {
    this.loadCategories();
    this.loadService();
  }

  // Liste
  loadCategories(): void {
    this.serviceService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  loadService(): void {
    this.serviceService.getService().subscribe(data => {
      // Associer chaque service à son nom de catégorie
      this.services = data.map(service => ({
        ...service,
        nomCategorie: this.getNomCagetorie(service.idCategorie)
      }));
    });
  }

  // Ajout
  addService(): void {
    const formData = new FormData();

    if (this.newService.idCategorie && this.newService.nomService && this.newService.prixBase) {
        formData.append('idCategorie', this.newService.idCategorie);
        formData.append('nomService', this.newService.nomService);
        formData.append('prixBase', this.newService.prixBase);

        console.log('Contenu de FormData :',formData);
    } else {
        console.log("Une des valeurs est undefined ou null !");
    }

    console.log(formData);
    this.serviceService.addService(this.newService.idCategorie,this.newService.nomService, this.newService.prixBase).subscribe(() => {
      this.loadService(); // Recharge la liste après ajout
      this.newService = { idCategorie: '', nomService: '', prixBase: ''}; // Réinitialise le formulaire
    });
  }

  // Suppression d'une année
  deleteService(id: string): void {
    this.serviceService.deleteService(id).subscribe(() => {
      this.loadService(); // Recharge la liste après suppression
    });
  }

  // Modal
  openUpdateModal(service: any) {
    this.selectedService = { ...service};
    const modalElement = document.getElementById('editModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  // Update
  updateService(id: string, idCategorie: string, nomService: string, prixBase: string): void {
    if(id){
      this.serviceService.updateService(id, idCategorie, nomService, prixBase).subscribe(() => {
        this.loadService();
        this.selectedService = { };
      });
    }
    else{
      console.log("Tsy hita le id");
    }
  }

  confirmUpdateService(){
    this.updateService(this.selectedService._id, this.selectedService.idCategorie,this.selectedService.nomService, this.selectedService.prixBase);
  }

  openDeleteModal(service: any) {
    this.selectedService = { ...service}
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  confirmDeleteService(){
    this.deleteService(this.selectedService._id);
  }

// get nom categorie by idCategorie
  getNomCagetorie(idCategorie: string): string {
    const categorie = this.categories.find(cat => cat._id === idCategorie);
    console.log("CATEGORIIIIIE : ", categorie);
    return categorie ? categorie.nomCategorie : 'Non catégorisé';
  }
}
