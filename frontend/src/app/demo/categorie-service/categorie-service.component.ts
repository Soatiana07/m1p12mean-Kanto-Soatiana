import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategorieServiceService } from 'src/app/services/Manager/categorie-service.service';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';

declare let bootstrap: any;
@Component({
  selector: 'app-categorie-service',
  standalone: true,
  imports: [CardComponent, CommonModule, HttpClientModule, FormsModule],
  templateUrl: './categorie-service.component.html',
  styleUrl: './categorie-service.component.scss',
  providers: [CategorieServiceService]
})
export class CategorieServiceComponent implements OnInit {
  categories: any[] = []; // ✅ Initialisation correcte
  newCategorie = { nomCategorie : ''};
  isEditing = false; // Indicateur de modification
  selectedCategorie: any = {};
  constructor(private categorieServiceService: CategorieServiceService) { }

  ngOnInit(): void {
    this.loadCategorie();
    // throw new Error('Method not implemented.');
  }

  // Liste
  loadCategorie(): void {
    console.log('ito eeee');
    this.categorieServiceService.getCategorieService().subscribe(data => this.categories = data);
  }

  // Ajout
  addCategorie(): void {
    const formData = new FormData();

    if (this.newCategorie.nomCategorie) {
        formData.append('nomCategorie', this.newCategorie.nomCategorie);

        console.log('Contenu de FormData :',formData);
    } else {
        console.log("Une des valeurs est undefined ou null !");
    }

    console.log(formData);
    this.categorieServiceService.addCategorieService(this.newCategorie.nomCategorie).subscribe(() => {
      this.loadCategorie(); // Recharge la liste après ajout
      this.newCategorie = { nomCategorie: ''}; // Réinitialise le formulaire
    });
  }

  // Suppression
  deleteCategorie(id: string): void {
    this.categorieServiceService.deleteCategorieService(id).subscribe(() => {
      this.loadCategorie(); // Recharge la liste après suppression
    });
  }

  // Modal
  openUpdateModal(categorie: any) {
    this.selectedCategorie = { ...categorie};
    const modalElement = document.getElementById('editModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  // Update
  updateCategorie(id: string, nomCategorie: string): void {
    if(id){
      this.categorieServiceService.updateCategorieService(id, nomCategorie).subscribe(() => {
        this.loadCategorie();
        this.selectedCategorie = { };
      });
    }
    else{
      console.log("Tsy hita le id");
    }
  }

  confirmUpdateCategorie(){
    this.updateCategorie(this.selectedCategorie._id, this.selectedCategorie.nomCategorie);
  }

  openDeleteModal(categorie: any) {
    this.selectedCategorie = { ...categorie}
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  confirmDeleteCategorie(){
    this.deleteCategorie(this.selectedCategorie._id);
  }

}
