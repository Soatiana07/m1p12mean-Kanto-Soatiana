import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoriquePrixServiceService {

  private apiUrl = `${environment.apiUrl}/historiquePrixService`;
  constructor(private http: HttpClient) { }

  // Liste
  getHistoriquePrixService(): Observable<any> {
    console.log(this.apiUrl);
    console.log("Liste avy any am service :", this.http.get(this.apiUrl));
    return this.http.get(this.apiUrl);
  }

  // Update
  updateHistoriquePrixServiceService(id: string, historique: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, historique);
  }
  // Create
  addHistoriquePrixService(historique : any): Observable<any> {
    return this.http.post(this.apiUrl, historique);
  }

}
