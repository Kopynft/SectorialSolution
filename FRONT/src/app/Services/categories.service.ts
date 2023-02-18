import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Categories } from '../Interfaces/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private endPoint: string = environment.endPoint;
  private apiUrl: string = this.endPoint + "Categories/";

  constructor(private http:HttpClient) { }

  getList():Observable<Categories[]>
  {
    return this.http.get<Categories[]>(`${this.apiUrl}`)
  }

  add(modelo:Categories):Observable<Categories>
  {
    return this.http.post<Categories>(`${this.apiUrl}`,modelo);
  }

  swapState(modelo:Categories):Observable<Categories>
  {
    if(modelo.active === 1)
    {
      console.log("Swapped")
      modelo.active = 0;
      return this.http.put<Categories>(`${this.apiUrl}`, modelo);
    }
    else
    {
      modelo.active = 1;
      return this.http.put<Categories>(`${this.apiUrl}`, modelo);
    }
  }

  deleteCategory(idmodelo:number):Observable<void>
  {
    return this.http.delete<void>(`${this.apiUrl}${idmodelo}`);
  }
}
