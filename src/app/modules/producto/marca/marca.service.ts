import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/shared/interfaces/ApiResponse';
import { MarcaDTO } from 'src/app/shared/interfaces/MarcaDTO';
import { SqlRspDTO } from 'src/app/shared/interfaces/SqlRspDTO';
import { getBackUrl } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  url = '';

  constructor(
    private http : HttpClient
  ) { 
    this.url = `${getBackUrl()}Marca/`;
  }

  getListMarca(): Observable<ApiResponse<MarcaDTO[]>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    return this.http.get<ApiResponse<MarcaDTO[]>>(`${this.url}getListMarca`, {headers: httpHeader});
  }

  getMarcaByID(nIdMarca : number): Observable<ApiResponse<MarcaDTO>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    const httpParams = new HttpParams()
    .append('nIdMarca', nIdMarca);
    return this.http.get<ApiResponse<MarcaDTO>>(`${this.url}getMarcaByID`, {headers: httpHeader, params: httpParams});
  }

  postInsMarca(elemento : MarcaDTO): Observable<ApiResponse<SqlRspDTO>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    return this.http.post<ApiResponse<SqlRspDTO>>(`${this.url}postInsMarca`, elemento, {headers: httpHeader});
  }
  
  postUpdMarca(elemento : MarcaDTO): Observable<ApiResponse<SqlRspDTO>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    return this.http.post<ApiResponse<SqlRspDTO>>(`${this.url}postUpdMarca`, elemento, {headers: httpHeader});
  }
}
