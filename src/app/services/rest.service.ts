import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) {}

  getDataNasa(latitude, longitude){

    return this.http.get(`https://pmmpublisher.pps.eosdis.nasa.gov/opensearch?q=precip_30mn&lat=-23.462998300000002&lon=-46.525899400000014&limit=20&startTime=2019-10-19&endTime=2019-10-19`);

  }

  incluirMarcardor(params){
     return this.http.post(`http://127.0.0.1:8000/api/marcadores`,params);
  }

  listarMarcador(id){
    return this.http.get(`http://127.0.0.1:8000/api/marcadores/${id}`);
  }

  listarMarcadores(){
    return this.http.get(`http://127.0.0.1:8000/api/marcadores`);
  }

  listarCategorias(){
    return this.http.get(`http://127.0.0.1:8000/api/categorias`);
  }

}
