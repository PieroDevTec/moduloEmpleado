import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  private url = "http://localhost:8080/empleado/v1";
  constructor(private http:HttpClient) { }

  getListDepartamento():Observable<any>{
    return this.http.get<any>(`${this.url}/list_departamento`).pipe(
      map(response => response.list)
    );
  }

  getEmpleByDepartamento(body:any):Observable<any>{
    return this.http.post<any>(`${this.url}/list_empl_by_departamento`,body);
  }

  getListEmpleados():Observable<any>{
    return this.http.get<any>(`${this.url}/lista_empleados`).pipe(
      map(response => response.list)
    );
  };
  getListEmpleadosData(body:any):Observable<any>{
    return this.http.post<any>(`${this.url}/lista_datos`,body);
  }
}
