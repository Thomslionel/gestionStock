import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../interfaces/environment';
import { ApiResponse } from '../../interfaces/ApiResponse';
import { StockInterface } from '../../interfaces/StockInterface';



@Injectable({
  providedIn: 'root'
})
export class StockService {


  private url = environment.apiUrl + "/stock";


  constructor(
    private http: HttpClient
  ) {}





  /**
   * Récupérer le stock d'un produit
   */
  getStockByProduit(code: string) {


    return this.http.get<ApiResponse<StockInterface>>(

      `${this.url}/produit/${code}`

    );

  }







  /**
   * Récupérer tous les stocks
   */
  getAllStocks(){


    return this.http.get<ApiResponse<StockInterface[]>>(

      this.url

    );


  }








  /**
   * Récupérer uniquement les stocks faibles
   */
  getStockFaible(){


    return this.http.get<ApiResponse<StockInterface[]>>(


      `${this.url}/faible`


    );


  }








  /**
   * Augmenter le stock
   */
  augmenterStock(
    code:string,
    quantite:number
  ){


    return this.http.put<ApiResponse<StockInterface>>(


      `${this.url}/augmenter/${code}?quantite=${quantite}`,


      {}


    );


  }








  /**
   * Diminuer le stock
   */
  diminuerStock(
    code:string,
    quantite:number
  ){


    return this.http.put<ApiResponse<StockInterface>>(


      `${this.url}/diminuer/${code}?quantite=${quantite}`,


      {}


    );


  }








  /**
   * Ajustement inventaire
   */
  ajusterStock(
    code:string,
    quantite:number
  ){


    return this.http.put<ApiResponse<StockInterface>>(


      `${this.url}/ajuster/${code}?quantite=${quantite}`,


      {}


    );


  }



}