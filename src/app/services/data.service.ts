import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = "http://localhost:3000/pets"

  constructor(private http:HttpClient) {
    
   }

  getRegistrations(): Observable<Record<string,string|number|boolean|undefined>[]>{
    return this.http.get<Record<string,string|number|boolean|undefined>[]>(this.url)
   }

  addRegistration(registration: Record<string,string|number|boolean|undefined>): Observable<Record<string,string|number|boolean|undefined>>{
    return this.http.post<Record<string,string|number|boolean|undefined>>(this.url,registration)
   }
   
  updateRegistration(registration: Record<string,string|number|boolean|undefined>): Observable<Record<string,string|number|boolean|undefined>>{
    return this.http.patch<Record<string,string|number|boolean|undefined>>(`${this.url}/${registration["id"]}`,registration)
   }

  deleteRegistration(id: number): Observable<Record<string,string|number|boolean|undefined>>{
    return this.http.delete<Record<string,string|number|boolean|undefined>>(`${this.url}/${id}`)
   }
}
