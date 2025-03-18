import { Component, OnInit } from '@angular/core';
import { CardComponent } from "../../theme/shared/components/card/card.component";
import { FormControl } from '@angular/forms';
import { debounceTime, Observable, startWith, switchMap } from 'rxjs';
import { FournisseurService } from 'src/app/services/Manager/fournisseur.service';
declare let bootstrap: any;

@Component({
  selector: 'app-fournisseur',
  imports: [CardComponent],
  templateUrl: './fournisseur.component.html',
  styleUrl: './fournisseur.component.scss'
})
export class FournisseurComponent implements OnInit {
  constructor(private fournisseurService: FournisseurService) {}
  openAddModal() {
    const modalElement = document.getElementById('ajoutModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }
  paysControl = new FormControl('');
  filteredPays!: Observable<any[]>;
  ngOnInit() {
    this.filteredPays = this.paysControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300), // Ajoute un délai pour éviter trop d'appels API
      switchMap((value) => this.fournisseurService.searchPays(value || ''))
    );
  }



}
