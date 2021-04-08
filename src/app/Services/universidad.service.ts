import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { persona } from "../Models/Personas.Model";


@Injectable({
  providedIn: 'root'
})
export class UniversidadService {

  UrlPersona = 'https://localhost:5001/api/Personas/'

  constructor(private http:HttpClient) { }

  //#region  Personas
  getPersonas(): Observable<persona[]>{
    return this.http.get<persona[]>(this.UrlPersona+'GetPersona?id=' + -1)
   }
   guardarUsuario(persona: persona){
     
     return this.http.post(this.UrlPersona+'AddPersona', persona);
   }
 
   UpdatePersona(persona: persona){
     
     return this.http.put(this.UrlPersona+'UpdatePersona', persona);
   }
   DeletePersona(id:number){
     
     return this.http.delete<persona>(this.UrlPersona+'DeletePersona?id=' + id );
   }

  //#endregion
  
}

