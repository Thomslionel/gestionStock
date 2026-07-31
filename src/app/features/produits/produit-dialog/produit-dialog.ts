import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Categorie } from '../../../core/services/categorie';
import { CategorieInterface } from '../../../interfaces/Categorie';
import { ProduitInterface } from '../../../interfaces/ProduitInterface';
import { MatCheckbox, MatCheckboxModule } from "@angular/material/checkbox";
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-produit-dialog',
  imports: [
    CommonModule,

    ReactiveFormsModule,

    MatDialogModule,

    MatFormFieldModule,

    MatInputModule,

    MatButtonModule,

    MatCheckboxModule,

    MatSelectModule

  ],
  templateUrl: './produit-dialog.html',
  styleUrl: './produit-dialog.css',
})
export class ProduitDialog implements OnInit {



  form!: FormGroup;



  categories: CategorieInterface[] = [];



  constructor(


    private fb: FormBuilder,


    private dialogRef: MatDialogRef<ProduitDialog>,


    private categorieService: Categorie,


    @Inject(MAT_DIALOG_DATA)

    public data: ProduitInterface | null


  ) { }





  ngOnInit(): void {



    this.form = this.fb.group({


      code: [

        '',

        Validators.required

      ],



      designation: [

        '',

        Validators.required

      ],



      description: [

        ''

      ],



      prixAchat: [

        0,

        Validators.required

      ],



      prixVente: [

        0,

        Validators.required

      ],



      tva: [

        0

      ],



      stockMinimum: [

        0,

        Validators.required

      ],



      actif: [

        true

      ],



      categorieId: [

        null,

        Validators.required

      ]



    });



    this.chargerCategories();





    if (this.data) {


      this.form.patchValue({

        code: this.data.code,

        designation: this.data.designation,

        description: this.data.description,

        prixAchat: this.data.prixAchat,

        prixVente: this.data.prixVente,

        tva: this.data.tva,

        stockMinimum: this.data.stockMinimum,

        actif: this.data.actif,

        categorieId: this.data.categorieId


      });


    }



  }







  chargerCategories() {


    this.categorieService.findAll()

      .subscribe({

        next: (response) => {


          this.categories = response.data;


        },


        error: (err) => {


          console.log(err);


        }


      });


  }








  enregistrer() {



    if (this.form.invalid) {


      this.form.markAllAsTouched();

      return;


    }



    this.dialogRef.close(

      this.form.value

    );


  }





  fermer() {


    this.dialogRef.close();


  }



}