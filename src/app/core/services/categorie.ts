import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../interfaces/ApiResponse';
import { environment } from '../../interfaces/environment';
import { CategorieInterface } from '../../interfaces/Categorie';

@Injectable({
  providedIn: 'root',
})
export class Categorie {

  private url = environment.apiUrl + "/categorie";


    constructor(
        private http: HttpClient
    ){}



    findAll(){

        return this.http.get<ApiResponse<CategorieInterface[]>>(

            this.url

        );

    }



    findById(id:number){

        return this.http.get<ApiResponse<CategorieInterface>>(

            `${this.url}/${id}`

        );

    }



    save(categorie:CategorieInterface){

        return this.http.post<ApiResponse<CategorieInterface>>(

            this.url,

            categorie

        );

    }



    update(
        id:number,
        categorie:CategorieInterface
    ){

        return this.http.put<ApiResponse<CategorieInterface>>(

            `${this.url}/${id}`,

            categorie

        );

    }



    delete(id:number){

        return this.http.delete<ApiResponse<any>>(

            `${this.url}/${id}`

        );

    }
  
}
