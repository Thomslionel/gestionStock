import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiResponse } from '../../interfaces/ApiResponse';
import { environment } from '../../interfaces/environment';
import { StockInterface } from '../../interfaces/StockInterface';



@Injectable({
  providedIn: 'root',
})
export class StockService {



  private url = environment.apiUrl + "/stock";



  constructor(
    private http:HttpClient
  ){}




  /**
   * Tous les stocks
   */
  findAll(){


    return this.http.get<ApiResponse<StockInterface[]>>(

      this.url

    );


  }






  /**
   * Stock d'un lot
   */
  findByLot(numeroLot:string){


    return this.http.get<ApiResponse<StockInterface>>(

      `${this.url}/lot/${numeroLot}`

    );


  }







  /**
   * Stocks faibles
   */
  getStockFaible(){


    return this.http.get<ApiResponse<StockInterface[]>>(

      `${this.url}/faibles`

    );


  }


}