import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Topics } from '../Interfaces/topics';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {

  private endPoint: string = environment.endPoint;
  private apiUrl: string = this.endPoint + "Topics/";

  constructor(private http:HttpClient) { }

  getList():Observable<Topics[]>
  {
    return this.http.get<Topics[]>(`${this.apiUrl}`)
  }

  add(modelo:Topics):Observable<Topics>
  {
    return this.http.post<Topics>(`${this.apiUrl}`,modelo);
  }

  swapState(modelo:Topics):Observable<Topics>
  {
    if(modelo.active === 1)
    {
      console.log("Swapped")
      modelo.active = 0;
      return this.http.put<Topics>(`${this.apiUrl}`, modelo);
    }
    else
    {
      modelo.active = 1;
      return this.http.put<Topics>(`${this.apiUrl}`, modelo);
    }
  }

  deleteTopic(idmodelo:number):Observable<void>
  {
    return this.http.delete<void>(`${this.apiUrl}${idmodelo}`);
  }
}
