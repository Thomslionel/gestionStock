import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../interfaces/environment';
import { ApiResponse } from '../../interfaces/ApiResponse';
import { MouvementStockInterface } from '../../interfaces/MouvementStockInterface';



@Injectable({
  providedIn:'root'
})
export class MouvementStockService {



private url = environment.apiUrl + "/mouvement-stock";



constructor(
    private http:HttpClient
){}





save(mouvement:any){


    return this.http.post<ApiResponse<MouvementStockInterface>>(

        this.url,

        mouvement

    );


}






findAll(){


    return this.http.get<ApiResponse<MouvementStockInterface[]>>(

        this.url

    );


}




historiqueLot(numeroLot:string){


    return this.http.get<ApiResponse<MouvementStockInterface[]>>(

        `${this.url}/lot/${numeroLot}`

    );


}



}