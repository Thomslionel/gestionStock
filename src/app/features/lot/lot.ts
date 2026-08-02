import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { LotInterface } from '../../interfaces/LotInterface';

import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';
import { LotsService } from '../../core/services/lots-service';
import { LotDialog } from './lot-dialog/lot-dialog';



@Component({

  selector:'app-lot',

  standalone:true,

  imports:[

    CommonModule,

    MatTableModule,

    MatButtonModule,

    MatIconModule,

    MatTooltipModule

  ],

  templateUrl:'./lot.html',

  styleUrl:'./lot.css'

})


export class Lot implements OnInit {



  lots:LotInterface[]=[];



  today = new Date();





  displayedColumns=[

    'numeroLot',

    'produit',

    'fabrication',

    'peremption',

    'quantite',

    'statut',

    'actions'

  ];







  constructor(

    private lotService:LotsService,

    private dialog:MatDialog,

    private snackBar:MatSnackBar,

    private cd: ChangeDetectorRef

){}





  ngOnInit():void {

    this.loadLots();

  }









  loadLots():void {


    this.lotService.findAll()

    .subscribe({

      next:(response)=>{


    this.lots = response.data;


    this.cd.detectChanges();


},


      error:(err)=>{


        console.error(err);


        this.snackBar.open(

          "Erreur chargement lots",

          "Fermer",

          {
            duration:3000
          }

        );


      }


    });


  }









  /**
   * Vérifie si un lot est expiré
   */

  isExpire(date:string):boolean {


    if(!date){

      return false;

    }


    return new Date(date) < new Date();


  }









  /**
   * Expiration dans les 30 jours
   */

  expireBientot(date:string):boolean {


    if(!date){

      return false;

    }



    const expiration = new Date(date);


    const limite = new Date();


    limite.setDate(
      limite.getDate()+30
    );



    return expiration <= limite
        &&
        expiration >= new Date();


  }









  nouveauLot():void {


    const dialogRef = this.dialog.open(

      LotDialog,

      {

        width:'600px',

        disableClose:true

      }

    );





    dialogRef.afterClosed()

    .subscribe(result=>{


      if(!result){

        return;

      }





      this.lotService.save(result)

      .subscribe({

        next:(response)=>{


          this.snackBar.open(

            response.message,

            "Fermer",

            {
              duration:3000
            }

          );



          this.loadLots();


        },


        error:(err)=>{


          this.snackBar.open(

            err.error?.message ??
            "Erreur création lot",

            "Fermer",

            {
              duration:4000
            }

          );


        }


      });



    });


  }









  modifierLot(lot:LotInterface):void {



    const dialogRef = this.dialog.open(

      LotDialog,

      {

        width:'600px',

        disableClose:true,

        data:lot

      }

    );






    dialogRef.afterClosed()

    .subscribe(result=>{


      if(!result){

        return;

      }






      this.lotService.update(

        lot.id!,

        result

      )

      .subscribe({

        next:(response)=>{


          this.snackBar.open(

            response.message,

            "Fermer",

            {
              duration:3000
            }

          );



          this.loadLots();


        },


        error:(err)=>{


          this.snackBar.open(

            err.error?.message ??
            "Erreur modification lot",

            "Fermer",

            {
              duration:4000
            }

          );


        }


      });



    });


  }









  supprimerLot(lot:LotInterface):void {



    const dialogRef=this.dialog.open(

      ConfirmDialog,

      {

        width:'450px',

        data:{


          title:"Suppression lot",


          message:

          `Voulez-vous supprimer le lot "${lot.numeroLot}" ?`


        }


      }


    );







    dialogRef.afterClosed()

    .subscribe(result=>{


      if(!result){

        return;

      }





      this.lotService.delete(

        lot.id!

      )

      .subscribe({

        next:(response)=>{


          this.snackBar.open(

            response.message,

            "Fermer",

            {
              duration:3000
            }

          );


          this.loadLots();


        },



        error:(err)=>{


          this.snackBar.open(

            err.error?.message ??
            "Erreur suppression lot",

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