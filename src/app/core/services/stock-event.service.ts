import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn:'root'
})
export class StockEventService {


    private mouvementSubject = new Subject<void>();


    mouvementChange$ = this.mouvementSubject.asObservable();



    notifierMouvement(){

        this.mouvementSubject.next();

    }


}