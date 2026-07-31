import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { StockInterface } from '../../interfaces/StockInterface';
import { StockService } from '../../core/services/stock';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MouvementStockDialog } from './mouvement-stock-dialog/mouvement-stock-dialog';



@Component({
  selector: 'app-stock',

  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],

  templateUrl: './stock.html',

  styleUrl: './stock.css',
})
export class Stock implements OnInit {


  stocks: StockInterface[] = [];



  displayedColumns = [

    'produit',

    'disponible',

    'reserve',

    'reelle',

    'actions'

  ];





  constructor(

    private stockService: StockService,

    private cd: ChangeDetectorRef,

    private dialog: MatDialog,

    private snackBar: MatSnackBar


  ) {}





  ngOnInit(): void {


    this.loadStocks();


  }







  /**
   * Charger tous les stocks
   */
  loadStocks(){


    this.stockService.getAllStocks()

    .subscribe({

      next:(response)=>{


        this.stocks = response.data;


        this.cd.detectChanges();


      },


      error:(err)=>{


        console.log(err);


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


        this.stocks = response.data;


        this.cd.detectChanges();


      },


      error:(err)=>{


        console.log(err);


      }


    });


  }









  augmenter(stock: StockInterface){



    const dialogRef = this.dialog.open(

      MouvementStockDialog,

      {

        width:'450px',

        data:{

          type:'ENTREE',

          produit:stock.produitDesignation

        }

      }

    );






    dialogRef.afterClosed()

    .subscribe(qte=>{


      if(!qte){

        return;

      }





      this.stockService.augmenterStock(

        stock.produitCode,

        qte

      )

      .subscribe({

        next:(response)=>{


          this.snackBar.open(

            response.message,

            'Fermer',

            {

              duration:3000

            }

          );



          this.loadStocks();



        },


        error:(err)=>{


          this.snackBar.open(

            err.error?.message ?? 
            "Erreur lors de l'entrée en stock",

            'Fermer',

            {

              duration:4000

            }

          );


        }


      });



    });



  }









  diminuer(stock:StockInterface){



    const dialogRef = this.dialog.open(

      MouvementStockDialog,

      {

        width:'450px',

        data:{

          type:'SORTIE',

          produit:stock.produitDesignation

        }

      }

    );







    dialogRef.afterClosed()

    .subscribe(qte=>{


      if(!qte){

        return;

      }






      this.stockService.diminuerStock(

        stock.produitCode,

        qte

      )

      .subscribe({

        next:(response)=>{


          this.snackBar.open(

            response.message,

            'Fermer',

            {

              duration:3000

            }

          );



          this.loadStocks();



        },


        error:(err)=>{


          this.snackBar.open(

            err.error?.message ??
            "Erreur lors de la sortie du stock",

            'Fermer',

            {

              duration:4000

            }

          );


        }


      });



    });



  }



}