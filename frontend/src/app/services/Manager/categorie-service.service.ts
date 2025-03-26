import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategorieServiceService {

  private apiUrl = `${environment.apiUrl}/categorieService`;
  constructor(private http: HttpClient) { }

  // Liste
  getCategorieService(): Observable<any> {
    console.log(this.apiUrl);
    return this.http.get(this.apiUrl);
  }

  // Create
  addCategorieService(categorie: FormData): Observable<any> {
    return this.http.post(this.apiUrl, categorie);
  }

  // Update
  updateCategorieService(id: string, categorie: string): Observable<any> {
    console.log('bonjour');
    return this.http.put(`${this.apiUrl}/${id}`, categorie);
  }

  // Delete
  deleteCategorieService(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Get by id
  getCategorieServiceById(id:string): Observable<any>{
    return this.http.get(this.apiUrl);
  }

}
