import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpecialiteEmployeService {

  private apiUrl = `${environment.apiUrl}/specialiteEmploye`;
  constructor(private http: HttpClient) { }

  // Liste by idEmploye (Liste)
  getSpecialitesByidEmploye(idEmploye: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${idEmploye}`);
  }

  // Liste
  getAllSpecialiteEmploye(): Observable<any>{
    return this.http.get(this.apiUrl);
  }

  // ajout
  addSpecialiteEmploye(specialiteEmploye: any): Observable<any>{
    return this.http.post(this.apiUrl, specialiteEmploye);
  }

  // Delete by id de la table
  deleteSpecialiteEmploye(id: string): Observable<any>{
    console.log("id specialiteEmploye a supprimer :", id);
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Update
  updateSpecialiteEmploye(specialiteEmploye: any): Observable<any>{
    return this.http.put(`${this.apiUrl}/${specialiteEmploye._id}`, specialiteEmploye);
  }
  
}
