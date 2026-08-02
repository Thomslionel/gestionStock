import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


import { StockInterface } from '../../interfaces/StockInterface';

import { StockService } from '../../core/services/stock';

import { MouvementStockService } from '../../core/services/mouvement-stock';

import { MouvementStockDialog } from './mouvement-stock-dialog/mouvement-stock-dialog';



@Component({

selector:'app-stock',

standalone:true,

imports:[

CommonModule,

MatTableModule,

MatButtonModule,

MatIconModule

],

templateUrl:'./stock.html',

styleUrl:'./stock.css'

})
export class Stock implements OnInit {



stocks:StockInterface[]=[];




displayedColumns=[

'lot',

'produit',

'peremption',

'disponible',

'reserve',

'reelle',

'actions'

];





constructor(

private stockService:StockService,

private mouvementService:MouvementStockService,

private dialog:MatDialog,

private snackBar:MatSnackBar,

private cd:ChangeDetectorRef

){}





ngOnInit():void{


this.loadStocks();


}






/**
 * Charger tous les stocks
 */
loadStocks(){


this.stockService.findAll()

.subscribe({

next:(response)=>{


this.stocks=response.data;


this.cd.detectChanges();


},


error:(err)=>{


console.error(err);


}


});


}








/**
 * Charger uniquement les stocks faibles
 */
loadStocksFaibles(){



this.stockService.getStockFaible()

.subscribe({

next:(response)=>{


this.stocks=response.data;


this.cd.detectChanges();


},


error:(err)=>{


console.error(err);


}


});


}








/**
 * Entrée en stock
 */
augmenter(stock:StockInterface){



const dialogRef=this.dialog.open(

MouvementStockDialog,

{

width:'450px',

data:{

type:'ENTREE',

numeroLot:stock.numeroLot,

produit:stock.produitDesignation

}

}

);






dialogRef.afterClosed()

.subscribe(qte=>{


if(!qte){

return;

}





this.mouvementService.save({

numeroLot:stock.numeroLot,

quantite:qte,

type:'ENTREE',

observation:'Entrée en stock'


})

.subscribe({

next:(response)=>{


this.snackBar.open(

response.message,

"Fermer",

{

duration:3000

}

);


this.loadStocks();


},


error:(err)=>{


this.snackBar.open(

err.error?.message ??
"Erreur entrée stock",

"Fermer",

{

duration:4000

}

);


}


});



});


}









/**
 * Sortie de stock
 */
diminuer(stock:StockInterface){



const dialogRef=this.dialog.open(

MouvementStockDialog,

{

width:'450px',

data:{

type:'SORTIE',

numeroLot:stock.numeroLot,

produit:stock.produitDesignation

}

}

);






dialogRef.afterClosed()

.subscribe(qte=>{


if(!qte){

return;

}






this.mouvementService.save({

numeroLot:stock.numeroLot,

quantite:qte,

type:'SORTIE',

observation:'Sortie de stock'


})

.subscribe({

next:(response)=>{


this.snackBar.open(

response.message,

"Fermer",

{

duration:3000

}

);


this.loadStocks();


},


error:(err)=>{


this.snackBar.open(

err.error?.message ??
"Erreur sortie stock",

"Fermer",

{

duration:4000

}

);


}


});



});


}



}