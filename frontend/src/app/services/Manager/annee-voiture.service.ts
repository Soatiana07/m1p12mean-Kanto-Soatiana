import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnneeVoitureService {

  private apiUrl = `${environment.apiUrl}/anneeVoiture`;
  constructor(private http: HttpClient) { }

  // Liste
  getAnnee(): Observable<any> {
    console.log(this.apiUrl);
    return this.http.get(this.apiUrl);
  }

  // Create
  addAnnee(annee: string, note: string): Observable<any> {
    const body ={ annee,note};
    return this.http.post(this.apiUrl, body);
  }

  // Update
  updateAnnee(id: string, annee: string, note: string): Observable<any> {
    const body = {annee, note};
    console.log(`${this.apiUrl}/${id}`);
    return this.http.put(`${this.apiUrl}/${id}`, body);
  }

  // Delete
  deleteAnnee(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
