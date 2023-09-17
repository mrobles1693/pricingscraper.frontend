import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/shared/interfaces/ApiResponse';
import { CategoriaDTO } from 'src/app/shared/interfaces/CategoriaDTO';
import { SqlRspDTO } from 'src/app/shared/interfaces/SqlRspDTO';
import { getBackUrl } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  url = '';

  constructor(
    private http : HttpClient
  ) { 
    this.url = `${getBackUrl()}Categoria/`;
  }

  getListCategoria(): Observable<ApiResponse<CategoriaDTO[]>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    return this.http.get<ApiResponse<CategoriaDTO[]>>(`${this.url}getListCategoria`, {headers: httpHeader});
  }

  getCategoriaByID(nIdCategoria : number): Observable<ApiResponse<CategoriaDTO>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    const httpParams = new HttpParams()
    .append('nIdCategoria', nIdCategoria);
    return this.http.get<ApiResponse<CategoriaDTO>>(`${this.url}getCategoriaByID`, {headers: httpHeader, params: httpParams});
  }

  postInsCategoria(elemento : CategoriaDTO): Observable<ApiResponse<SqlRspDTO>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    return this.http.post<ApiResponse<SqlRspDTO>>(`${this.url}postInsCategoria`, elemento, {headers: httpHeader});
  }
  
  postUpdCategoria(elemento : CategoriaDTO): Observable<ApiResponse<SqlRspDTO>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    return this.http.post<ApiResponse<SqlRspDTO>>(`${this.url}postUpdCategoria`, elemento, {headers: httpHeader});
  }
}
