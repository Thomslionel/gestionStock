import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../interfaces/ApiResponse';
import { environment } from '../../interfaces/environment';
import { LotInterface } from '../../interfaces/LotInterface';

@Injectable({
  providedIn: 'root',
})
export class LotsService {

  private url = environment.apiUrl + "/lot";



  constructor(
    private http: HttpClient
  ) { }





  /**
   * Récupérer tous les lots
   */
  findAll() {


    return this.http.get<ApiResponse<LotInterface[]>>(

      this.url

    );


  }








  /**
   * Récupérer un lot par id
   */
  findById(id: number) {


    return this.http.get<ApiResponse<LotInterface>>(

      `${this.url}/${id}`

    );


  }








  /**
   * Recherche par numéro lot
   */
  findByNumeroLot(numeroLot: string) {


    return this.http.get<ApiResponse<LotInterface>>(

      `${this.url}/numero/${numeroLot}`

    );


  }








  /**
   * Création d'un lot
   */
  save(lot: LotInterface) {


    return this.http.post<ApiResponse<LotInterface>>(

      this.url,

      lot

    );


  }








  /**
   * Modification d'un lot
   */
  update(
    id: number,
    lot: LotInterface
  ) {


    return this.http.put<ApiResponse<LotInterface>>(

      `${this.url}/${id}`,

      lot

    );


  }








  /**
   * Suppression d'un lot
   */
  delete(id: number) {


    return this.http.delete<ApiResponse<any>>(

      `${this.url}/${id}`

    );


  }








  /**
   * Lots d'un produit
   */
  findByProduit(produitCode: string) {


    return this.http.get<ApiResponse<LotInterface[]>>(

      `${this.url}/produit/${produitCode}`

    );


  }








  /**
   * Lots périmés
   */
  findPerimes() {


    return this.http.get<ApiResponse<LotInterface[]>>(

      `${this.url}/perimes`

    );


  }








  /**
   * Lots qui expirent bientôt
   */
  findQuiExpirent(nombreJour: number) {


    return this.http.get<ApiResponse<LotInterface[]>>(

      `${this.url}/expire/${nombreJour}`

    );


  }
}
