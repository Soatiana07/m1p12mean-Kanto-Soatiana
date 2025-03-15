import { Routes } from '@angular/router';
import { MarqueVoitureComponent } from './components/Manager/marque-voiture/marque-voiture.component';
export const routes: Routes = [
 { path: 'marqueVoiture', component: MarqueVoitureComponent },
 { path: '', redirectTo: 'articles', pathMatch: 'full' } // Redirectipar défaut
];
