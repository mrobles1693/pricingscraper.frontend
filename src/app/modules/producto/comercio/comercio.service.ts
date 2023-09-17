import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/shared/interfaces/ApiResponse';
import { ComercioDTO } from 'src/app/shared/interfaces/ComercioDTO';
import { SqlRspDTO } from 'src/app/shared/interfaces/SqlRspDTO';
import { getBackUrl } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class ComercioService {

  url = '';

  constructor(
    private http : HttpClient
  ) { 
    this.url = `${getBackUrl()}Comercio/`;
  }

  getListComercio(): Observable<ApiResponse<ComercioDTO[]>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    return this.http.get<ApiResponse<ComercioDTO[]>>(`${this.url}getListComercio`, {headers: httpHeader});
  }

  getComercioByID(nIdComercio : number): Observable<ApiResponse<ComercioDTO>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    const httpParams = new HttpParams()
    .append('nIdComercio', nIdComercio);
    return this.http.get<ApiResponse<ComercioDTO>>(`${this.url}getComercioByID`, {headers: httpHeader, params: httpParams});
  }

  postInsComercio(elemento : ComercioDTO): Observable<ApiResponse<SqlRspDTO>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    return this.http.post<ApiResponse<SqlRspDTO>>(`${this.url}postInsComercio`, elemento, {headers: httpHeader});
  }
  
  postUpdComercio(elemento : ComercioDTO): Observable<ApiResponse<SqlRspDTO>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    return this.http.post<ApiResponse<SqlRspDTO>>(`${this.url}postUpdComercio`, elemento, {headers: httpHeader});
  }
}
