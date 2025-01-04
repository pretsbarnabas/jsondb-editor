import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = "http://localhost:3000/registrations"

  constructor(private http:HttpClient) {
    
   }

  getRegistrations(): Observable<Record<string,string|number|Date|boolean>[]>{
    return this.http.get<Record<string,string|number|Date|boolean>[]>(this.url)
   }

  addRegistration(registration: Record<string,string|number|Date|boolean>): Observable<Record<string,string|number|Date|boolean>>{
    return this.http.post<Record<string,string|number|Date|boolean>>(this.url,registration)
   }
   
  updateRegistration(registration: Record<string,string|number|Date|boolean>): Observable<Record<string,string|number|Date|boolean>>{
    return this.http.patch<Record<string,string|number|Date|boolean>>(`${this.url}/${registration["id"]}`,registration)
   }

  deleteRegistration(id: number): Observable<Record<string,string|number|Date|boolean>>{
    return this.http.delete<Record<string,string|number|Date|boolean>>(`${this.url}/${id}`)
   }
}
