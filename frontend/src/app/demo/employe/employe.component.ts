import { Component } from '@angular/core';
import { CardComponent } from "../../theme/shared/components/card/card.component";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { EmployeService } from 'src/app/services/Manager/employe.service';

declare let bootstrap: any;
@Component({
  selector: 'app-employe',
  imports: [CardComponent,
    HttpClientModule,
    FormsModule,
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule],
  templateUrl: './employe.component.html',
  styleUrl: './employe.component.scss',
  providers: [EmployeService]
})
export class EmployeComponent {
  constructor(private employeService: EmployeService) { }
  // new Employe
  newEmploye: any = {
    dateEntree: '', // Date hampidirana azy
    idRole: '',
    nom: '',
    dateNaissance: '',
    cin: '',
    sexe: '',
    telephone: '',
    email: '',
    photo: '',
    adresse: '',
    salaireBrut: '',
    salaireNet: '',
    mdp: ''
  };

  employes: any[] = [];
  roles: any[] = [];
  selectedEmploye: any = {};


  // Load page
  ngOnInit(): void {
    this.loadEmploye();
    this.loadRoles();
    console.log("selectedEmploye",this.selectedEmploye);
  }

  // Liste employe
  loadEmploye(){
    this.employeService.getEmploye().subscribe(data => this.employes = data);
    console.log("Liste employes : ",this.employes);
  }

  // Liste roles
  loadRoles() {
    this.employeService.getRoles().subscribe(data => {
      this.roles = data;
    });
  }
  // open modal ajout
  openAddModal() {
    const modalElement = document.getElementById('ajoutModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  // Ajout nouvel employe
  addEmploye() {
    this.employeService.addEmploye(this.newEmploye).subscribe(() => {
      this.loadEmploye(); // Recharger la liste après ajout
      this.newEmploye = {}; // Réinitialiser le formulaire
    });
  }

  // Modal update
  openUpdateModal(employe: any){
    this.selectedEmploye = { ...employe};
    const modalElement = document.getElementById('editModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  // Update employe
  updateEmploye(){
    this.employeService.updateEmploye(this.selectedEmploye).subscribe(() => {
      // Mettre à jour la liste après modification
      this.loadEmploye();
      this.closeEditModal();
    });
  }

  closeEditModal() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('editModal')!);
    modal?.hide();
  }

  // Details modal
  openDetailsModal(id: string) {
    this.employeService.getEmployeById(id).subscribe(
      (data) => {
        this.selectedEmploye = data;
        const modal = document.getElementById('detailsEmployeModal');
        if (modal) {
          (modal as any).style.display = 'block'; // Ouvre le modal
        }
      },
      (error) => {
        console.error("Erreur lors de la récupération des détails :", error);
      }
    );
  }

  // close details modal
  closeDetailsModal() {
    const modal = document.getElementById('detailsEmployeModal');
    if (modal) {
      (modal as any).style.display = 'none'; // Ferme le modal
    }
  }
}
