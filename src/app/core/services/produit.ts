import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../interfaces/ApiResponse';
import { environment } from '../../interfaces/environment';
import { ProduitInterface } from '../../interfaces/ProduitInterface';

@Injectable({
  providedIn: 'root',
})
export class Produit {


   private url = environment.apiUrl + "/produit";


    constructor(
        private http: HttpClient
    ){}




    findAll(){

        return this.http.get<ApiResponse<ProduitInterface[]>>(

            this.url

        );

    }





    findById(id:number){

        return this.http.get<ApiResponse<ProduitInterface>>(

            `${this.url}/${id}`

        );

    }





    save(produit:ProduitInterface){

        return this.http.post<ApiResponse<ProduitInterface>>(

            this.url,

            produit

        );

    }





    update(
        id:number,
        produit:ProduitInterface
    ){

        return this.http.put<ApiResponse<ProduitInterface>>(

            `${this.url}/${id}`,

            produit

        );

    }





    delete(id:number){

        return this.http.delete<ApiResponse<any>>(

            `${this.url}/${id}`

        );

    }





    findByCategorie(id:number){

        return this.http.get<ApiResponse<ProduitInterface[]>>(

            `${this.url}/categorie/${id}`

        );

    }
  
}
