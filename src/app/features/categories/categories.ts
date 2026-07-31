import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { CategorieInterface } from '../../interfaces/Categorie';
import { Categorie } from '../../core/services/categorie';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CategorieDialog } from './categorie-dialog/categorie-dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-categories',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories implements OnInit {


  categories: CategorieInterface[] = [];


  displayedColumns = [
    'code',
    'libelle',
    'description',
    'actif',
    'actions'
  ];


  constructor(
    private categorieService: Categorie,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cd: ChangeDetectorRef
  ){}



  ngOnInit(): void {

    this.loadCategories();

  }



  loadCategories(): void {


    this.categorieService.findAll()

    .subscribe({

      next: (response) => {


        console.log(response);


        this.categories = response.data;


        // Force Angular à mettre à jour la vue
        this.cd.detectChanges();


      },


      error: (err) => {


        console.log(err);


      }

    });


  }




  nouvelleCategorie(): void {


    const dialogRef = this.dialog.open(CategorieDialog, {


      width: '600px',

      disableClose: true


    });



    dialogRef.afterClosed().subscribe(result => {


      if (!result) {

        return;

      }



      this.categorieService.save(result)

      .subscribe({

        next: (response) => {


          this.snackBar.open(

            response.message,

            'Fermer',

            {

              duration: 3000

            }

          );


          this.loadCategories();


        },


        error: (err) => {


          this.snackBar.open(

            err.error?.message ?? "Erreur lors de l'enregistrement",

            'Fermer',

            {

              duration: 4000

            }

          );


        }

      });


    });


  }



  modifierCategorie(categorie: CategorieInterface): void {


    const dialogRef = this.dialog.open(CategorieDialog, {


        width: '600px',

        disableClose: true,

        data: categorie


    });



    dialogRef.afterClosed().subscribe(result => {


        if(!result){

            return;

        }


        this.categorieService.update(
            categorie.id!,
            result
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


                this.loadCategories();


            },


            error:(err)=>{


                this.snackBar.open(

                    err.error?.message ?? "Erreur modification",

                    'Fermer',

                    {
                        duration:4000
                    }

                );


            }

        });


    });


}





supprimerCategorie(categorie: CategorieInterface): void {


    const confirmation = confirm(

        `Voulez-vous supprimer la catégorie ${categorie.libelle} ?`

    );


    if(!confirmation){

        return;

    }



    this.categorieService.delete(categorie.id!)

    .subscribe({

        next:(response)=>{


            this.snackBar.open(

                response.message,

                'Fermer',

                {
                    duration:3000
                }

            );


            this.loadCategories();


        },


        error:(err)=>{


            this.snackBar.open(

                err.error?.message ?? "Erreur suppression",

                'Fermer',

                {
                    duration:4000
                }

            );


        }


    });


}


}