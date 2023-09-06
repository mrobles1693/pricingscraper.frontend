import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/shared/interfaces/ApiResponse';
import { ProductoDTO } from 'src/app/shared/interfaces/ProductoDTO';
import { SelectDTO } from 'src/app/shared/interfaces/SelectDTO';
import { SqlRspDTO } from 'src/app/shared/interfaces/SqlRspDTO';
import { getBackUrl } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url = '';

  constructor(
    private http : HttpClient
  ) { 
    this.url = `${getBackUrl()}Producto/`;
  }

  getListProducto(): Observable<ApiResponse<ProductoDTO[]>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    return this.http.get<ApiResponse<ProductoDTO[]>>(`${this.url}getListProducto`, {headers: httpHeader});
  }

  getProductoByID(nIdProducto : number): Observable<ApiResponse<ProductoDTO>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    const httpParams = new HttpParams()
    .append('nIdProducto', nIdProducto);
    return this.http.get<ApiResponse<ProductoDTO>>(`${this.url}getProductoByID`, {headers: httpHeader, params: httpParams});
  }
  
  getSelectPresentacion(): Observable<ApiResponse<SelectDTO[]>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    return this.http.get<ApiResponse<SelectDTO[]>>(`${this.url}getSelectPresentacion`, {headers: httpHeader});
  }

  getSelectMarca(): Observable<ApiResponse<SelectDTO[]>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    return this.http.get<ApiResponse<SelectDTO[]>>(`${this.url}getSelectMarca`, {headers: httpHeader});
  }

  getSelectUnidadMedida(): Observable<ApiResponse<SelectDTO[]>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    return this.http.get<ApiResponse<SelectDTO[]>>(`${this.url}getSelectUnidadMedida`, {headers: httpHeader});
  }

  postInsProducto(elemento : ProductoDTO): Observable<ApiResponse<SqlRspDTO>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    return this.http.post<ApiResponse<SqlRspDTO>>(`${this.url}postInsProducto`, elemento, {headers: httpHeader});
  }
  
  postUpdProducto(elemento : ProductoDTO): Observable<ApiResponse<SqlRspDTO>>{
    const httpHeader = new HttpHeaders({'Content-type':'application/json'});
    return this.http.post<ApiResponse<SqlRspDTO>>(`${this.url}postUpdProducto`, elemento, {headers: httpHeader});
  }
}
