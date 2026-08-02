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
    ) { }




    /**
     * Liste tous les produits
     */
    findAll() {


        return this.http.get<ApiResponse<ProduitInterface[]>>(

            this.url

        );


    }







    /**
     * Recherche produit par id
     */
    findById(id: number) {


        return this.http.get<ApiResponse<ProduitInterface>>(

            `${this.url}/${id}`

        );


    }







    /**
     * Création produit
     */
    save(produit: ProduitInterface) {


        return this.http.post<ApiResponse<ProduitInterface>>(

            this.url,

            produit

        );


    }







    /**
     * Modification produit
     */
    update(
        id: number,
        produit: ProduitInterface
    ) {


        return this.http.put<ApiResponse<ProduitInterface>>(

            `${this.url}/${id}`,

            produit

        );


    }







    /**
     * Suppression logique
     */
    delete(id: number) {


        return this.http.delete<ApiResponse<any>>(

            `${this.url}/${id}`

        );


    }







    /**
     * Produits par catégorie
     */
    findByCategorie(id: number) {


        return this.http.get<ApiResponse<ProduitInterface[]>>(

            `${this.url}/categorie/${id}`

        );


    }



}