import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../interfaces/ApiResponse';
import { environment } from '../../interfaces/environment';
import { JwtToken } from '../../interfaces/JwtToken';
import { LoginRequest } from '../../interfaces/LoginRequest';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private url = environment.apiUrl + "/auth";

    constructor(private http:HttpClient){}

    login(login:LoginRequest){

        return this.http.post<ApiResponse<JwtToken>>(
            this.url + "/connexion",
            login
        );

    }

    refresh(refreshToken:string){

        return this.http.post<ApiResponse<JwtToken>>(

            this.url + "/refresh",

            {
                refreshToken
            }

        );

    }
}
