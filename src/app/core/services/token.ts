import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Token {

   save(token:string,refreshToken:string){

        localStorage.setItem("token",token);

        localStorage.setItem("refreshToken",refreshToken);

    }

    getToken(){

        return localStorage.getItem("token");

    }

    getRefreshToken(){

        return localStorage.getItem("refreshToken");

    }

    clear(){

        localStorage.clear();

    }
  
}
