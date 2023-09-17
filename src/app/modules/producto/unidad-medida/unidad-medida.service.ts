import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/shared/interfaces/ApiResponse';
import { SqlRspDTO } from 'src/app/shared/interfaces/SqlRspDTO';
import { UnidadMedidaDTO } from 'src/app/shared/interfaces/UnidadMedidaDTO';
import { getBackUrl } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class UnidadMedidaService {

  url = '';

  constructor(
    private http : HttpClient
  ) { 
    this.url = `${getBackUrl()}UnidadMedida/`;
  }

  getListUnidadMedida(): Observable<ApiResponse<UnidadMedidaDTO[]>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    return this.http.get<ApiResponse<UnidadMedidaDTO[]>>(`${this.url}getListUnidadMedida`, {headers: httpHeader});
  }

  getUnidadMedidaByID(nIdUnidadMedida : number): Observable<ApiResponse<UnidadMedidaDTO>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    const httpParams = new HttpParams()
    .append('nIdUnidadMedida', nIdUnidadMedida);
    return this.http.get<ApiResponse<UnidadMedidaDTO>>(`${this.url}getUnidadMedidaByID`, {headers: httpHeader, params: httpParams});
  }

  postInsUnidadMedida(elemento : UnidadMedidaDTO): Observable<ApiResponse<SqlRspDTO>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    return this.http.post<ApiResponse<SqlRspDTO>>(`${this.url}postInsUnidadMedida`, elemento, {headers: httpHeader});
  }
  
  postUpdUnidadMedida(elemento : UnidadMedidaDTO): Observable<ApiResponse<SqlRspDTO>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    return this.http.post<ApiResponse<SqlRspDTO>>(`${this.url}postUpdUnidadMedida`, elemento, {headers: httpHeader});
  }
}
