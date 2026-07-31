import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../interfaces/environment';

import { ApiResponse } from '../../interfaces/ApiResponse';
import { MouvementStockInterface } from '../../interfaces/MouvementStockInterface';




@Injectable({
  providedIn: 'root',
})
export class MouvementStockService {



  private url = environment.apiUrl + "/mouvement-stock";



  constructor(

    private http: HttpClient

  ){}




  /**
   * Créer un mouvement de stock
   */
  create(
    mouvement: MouvementStockInterface
  ){

    return this.http.post<ApiResponse<MouvementStockInterface>>(

      this.url,

      mouvement

    );

  }







  /**
   * Liste complète des mouvements
   */
  findAll(){

    return this.http.get<ApiResponse<MouvementStockInterface[]>>(

      this.url

    );

  }







  /**
   * Historique d'un produit
   */
  historiqueProduit(
    code:string
  ){

    return this.http.get<ApiResponse<MouvementStockInterface[]>>(

      `${this.url}/produit/${code}`

    );

  }



}