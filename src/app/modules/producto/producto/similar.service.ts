import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/shared/interfaces/ApiResponse';
import { SelectDTO } from 'src/app/shared/interfaces/SelectDTO';
import { SimilarDTO } from 'src/app/shared/interfaces/SimilarDTO';
import { SqlRspDTO } from 'src/app/shared/interfaces/SqlRspDTO';
import { getBackUrl } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class SimilarService {
  url = '';

  constructor(
    private http : HttpClient
  ) { 
    this.url = `${getBackUrl()}Similar/`;
  }

  getListSimilarByProducto(nIdProducto : number): Observable<ApiResponse<SimilarDTO[]>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    const httpParams = new HttpParams()
    .append('nIdProducto', nIdProducto);
    return this.http.get<ApiResponse<SimilarDTO[]>>(`${this.url}getListSimilarByProducto`, {headers: httpHeader, params: httpParams});
  }

  getSimilarByID(nIdSimilar : number): Observable<ApiResponse<SimilarDTO>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    const httpParams = new HttpParams()
    .append('nIdSimilar', nIdSimilar);
    return this.http.get<ApiResponse<SimilarDTO>>(`${this.url}getSimilarByID`, {headers: httpHeader, params: httpParams});
  }

  getSelectComercio(): Observable<ApiResponse<SelectDTO[]>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    return this.http.get<ApiResponse<SelectDTO[]>>(`${this.url}getSelectComercio`, {headers: httpHeader});
  }

  postInsSimilar(elemento : SimilarDTO): Observable<ApiResponse<SqlRspDTO>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    return this.http.post<ApiResponse<SqlRspDTO>>(`${this.url}postInsSimilar`, elemento, {headers: httpHeader});
  }
  
  postUpdSimilar(elemento : SimilarDTO): Observable<ApiResponse<SqlRspDTO>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    return this.http.post<ApiResponse<SqlRspDTO>>(`${this.url}postUpdSimilar`, elemento, {headers: httpHeader});
  }
}
