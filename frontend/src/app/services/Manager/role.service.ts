import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private apiUrl = `${environment.apiUrl}/role`;
  constructor(private http: HttpClient) { }

  // Liste
  getRole(): Observable<any> {
    console.log(this.apiUrl);
    return this.http.get(this.apiUrl);
  }

  // Create
  addRole(nomRole: string): Observable<any> {
    const body ={ nomRole};
    return this.http.post(this.apiUrl, body);
  }

  // Update
  updateRole(id: string, nomRole: string): Observable<any> {
    const body = {nomRole};
    console.log(`${this.apiUrl}/${id}`);
    return this.http.put(`${this.apiUrl}/${id}`, body);
  }

  // Delete
  deleteRole(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
