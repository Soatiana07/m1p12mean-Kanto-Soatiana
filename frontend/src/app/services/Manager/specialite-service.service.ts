import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpecialiteServiceService {

  private apiUrl = `${environment.apiUrl}/specialiteService`;
  constructor(private http: HttpClient) { }

  // Liste by idService (Liste)
  getSpecialitesByIdService(idService: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${idService}`);
  }

  // Liste
  getAllSpecialiteService(): Observable<any>{
    return this.http.get(this.apiUrl);
  }

  // ajout
  addSpecialiteService(specialiteService: any): Observable<any>{
    return this.http.post(this.apiUrl, specialiteService);
  }

  // Delete by id de la table
  deleteSpecialiteService(id: string): Observable<any>{
    console.log("id specialiteService a supprimer :", id);
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Update
  updateSpecialiteService(specialiteService: any): Observable<any>{
    return this.http.put(`${this.apiUrl}/${specialiteService._id}`, specialiteService);
  }
}
