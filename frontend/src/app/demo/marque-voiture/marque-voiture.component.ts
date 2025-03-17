import { Component, OnInit } from '@angular/core';
import { CardComponent } from "../../theme/shared/components/card/card.component";
import { MarqueVoitureService } from 'src/app/services/Manager/marque-voiture.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

declare let bootstrap: any;

@Component({
  selector: 'app-marque-voiture',
  imports: [CardComponent, CommonModule, HttpClientModule, FormsModule],
  templateUrl: './marque-voiture.component.html',
  styleUrl: './marque-voiture.component.scss',
  providers: [MarqueVoitureService]
})
export class MarqueVoitureComponent implements OnInit {

  marques: any[] = [];
  newMarque = { marque: '', note: ''};
  selectedMarque: any = {};
  constructor(private marqueService: MarqueVoitureService) { }

  ngOnInit(): void {
    this.loadMarque();
  }

  loadMarque(): void {
    this.marqueService.getMarque().subscribe(data => this.marques = data);
  }

  addMarque(): void {
    this.marqueService.addMarque(this.newMarque.marque,this.newMarque.note).subscribe(() => {
      this.loadMarque();
      this.newMarque = { marque: '', note: '' };

    });
  }

  openUpdateModal(marque: any) {
    this.selectedMarque = { ...marque };
    const modalElement = document.getElementById('editModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  updateMarque(id: string, marque: string, note: string): void {
    this.marqueService.updateMarque(id, marque, note).subscribe(() => {
      this.loadMarque();
      this.selectedMarque = { };
    });
  }

  confirmUpdateMarque(){
    this.updateMarque(this.selectedMarque._id, this.selectedMarque.marque, this.selectedMarque.note);
  }

  openDeleteModal(marque: any) {
    this.selectedMarque = { ...marque}
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  deleteMarque(id: string): void{
    this.marqueService.deleteMarque(id).subscribe(()=>{
      this.loadMarque();
      this.selectedMarque ={ };
    });

  }

  confirmDeleteMarque(){
    this.deleteMarque(this.selectedMarque._id);
  }

}
