import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';

import { MatButtonModule } from '@angular/material/button';

import { MatTableModule } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';



import { Produit } from '../../core/services/produit';

import { ProduitDialog } from './produit-dialog/produit-dialog';
import { ProduitInterface } from '../../interfaces/ProduitInterface';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';



@Component({
  selector: 'app-produits',

  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],

  templateUrl: './produits.html',

  styleUrl: './produits.css'

})
export class Produits implements OnInit {



  produits: ProduitInterface[] = [];



  displayedColumns = [

    'code',

    'designation',

    'categorie',

    'prixAchat',

    'prixVente',

    'stockMinimum',

    'actif',

    'actions'

  ];




  constructor(

    private produitService: Produit,

    private dialog: MatDialog,

    private snackBar: MatSnackBar,

    private cd: ChangeDetectorRef

  ) { }





  ngOnInit(): void {

    this.loadProduits();

  }






  loadProduits() {


    this.produitService.findAll()

      .subscribe({

        next: (response) => {


          this.produits = response.data;


          this.cd.detectChanges();


        },


        error: (err) => {

          console.log(err);

        }


      });


  }






  nouveauProduit() {


    const dialogRef = this.dialog.open(ProduitDialog, {

      width: '700px',

      disableClose: true

    });



    dialogRef.afterClosed().subscribe(result => {


      if (!result) {

        return;

      }



      this.produitService.save(result)

        .subscribe({

          next: (response) => {


            this.snackBar.open(

              response.message,

              "Fermer",

              {

                duration: 3000

              }

            );



            this.loadProduits();


          },


          error: (err) => {


            this.snackBar.open(

              err.error?.message ?? "Erreur création produit",

              "Fermer",

              {

                duration: 4000

              }

            );


          }


        });



    });


  }








  modifierProduit(produit: ProduitInterface) {



    const dialogRef = this.dialog.open(

      ProduitDialog,

      {


        width: '700px',


        disableClose: true,


        data: produit


      }

    );





    dialogRef.afterClosed().subscribe(result => {


      if (!result) {

        return;

      }



      this.produitService.update(

        produit.id!,

        result

      )

        .subscribe({

          next: (response) => {


            this.snackBar.open(

              response.message,

              "Fermer",

              {

                duration: 3000

              }

            );


            this.loadProduits();


          },


          error: (err) => {


            this.snackBar.open(

              err.error?.message ?? "Erreur modification produit",

              "Fermer",

              {

                duration: 4000

              }

            );


          }



        });



    });



  }









  supprimerProduit(produit: ProduitInterface) {

    const dialogRef = this.dialog.open(
      ConfirmDialog,
      {

        width: '450px',

        data: {

          title: 'Suppression produit',

          message: `Voulez-vous supprimer le produit "${produit.designation}" ?`

        }

      }

    );



    dialogRef.afterClosed().subscribe(result => {


      if (!result) {

        return;

      }



      this.produitService.delete(produit.id!)

        .subscribe({

          next: (response) => {


            this.snackBar.open(

              response.message,

              "Fermer",

              {

                duration: 3000

              }

            );


            this.loadProduits();


          },


          error: (err) => {


            this.snackBar.open(

              err.error?.message ?? "Erreur suppression produit",

              "Fermer",

              {

                duration: 4000

              }

            );


          }


        });



    });

  }




}