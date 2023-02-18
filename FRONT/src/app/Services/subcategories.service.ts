import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Subcategories } from '../Interfaces/subcategories';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriesService {

  private endPoint: string = environment.endPoint;
  private apiUrl: string = this.endPoint + "Subcategories/";

  constructor(private http:HttpClient) { }

  getList():Observable<Subcategories[]>
  {
    return this.http.get<Subcategories[]>(`${this.apiUrl}`)
  }

  add(modelo:Subcategories):Observable<Subcategories>
  {
    return this.http.post<Subcategories>(`${this.apiUrl}`,modelo);
  }

  swapState(modelo:Subcategories):Observable<Subcategories>
  {
    if(modelo.active === 1)
    {
      console.log("Swapped")
      modelo.active = 0;
      return this.http.put<Subcategories>(`${this.apiUrl}`, modelo);
    }
    else
    {
      modelo.active = 1;
      return this.http.put<Subcategories>(`${this.apiUrl}`, modelo);
    }
  }

  deleteSubcategory(idmodelo:number):Observable<void>
  {
    return this.http.delete<void>(`${this.apiUrl}${idmodelo}`);
  }
}
