import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModeleVoitureService {

  private apiUrl = `${environment.apiUrl}/modeleVoiture`;
  private apiUrlSearch = `${environment.apiUrl}/modeleVoiture/chercheModeleVoiture`;
  private apiUrlById = `${environment.apiUrl}/modeleVoiture/getModeleId`;
  constructor(private http: HttpClient) { }

   getModele(): Observable<any> {
      console.log(this.apiUrl);
      return this.http.get(this.apiUrl);
    }

    // Create
    addModele(modele: string, note: string): Observable<any> {
      const body ={ modele,note};
      return this.http.post(this.apiUrl, body);
    }

    // Update
    updateModele(id: string, modele: string, note: string): Observable<any> {
      const body = {modele, note};
      return this.http.put(`${this.apiUrl}/${id}`, body);
    }

    // Delete
    deleteModele(id: string): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${id}`);
    }

    searchModele(query: string): Observable<any> {
      return this.http.get(`${this.apiUrlSearch}?q=${query}`);
    }

    getModeleById(id: string): Observable<any> {
      return this.http.get(`${this.apiUrlById}/${id}`);
    }
}
