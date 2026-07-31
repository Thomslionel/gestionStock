import { CommonModule } from '@angular/common';

import { Component, Inject } from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';



@Component({

  selector: 'app-mouvement-stock-dialog',

  imports: [

    CommonModule,

    ReactiveFormsModule,

    MatDialogModule,

    MatButtonModule,

    MatFormFieldModule,

    MatInputModule

  ],

  templateUrl: './mouvement-stock-dialog.html',

  styleUrl: './mouvement-stock-dialog.css',

})
export class MouvementStockDialog {



  form!: FormGroup<{

    quantite: FormControl<number | null>;

  }>;





  constructor(

    private fb: FormBuilder,


    private dialogRef:

    MatDialogRef<MouvementStockDialog>,



    @Inject(MAT_DIALOG_DATA)

    public data: {

      type: string;

      produit: string;

    }


  ) {



    this.form = this.fb.group({

      quantite: new FormControl(

        0,

        [

          Validators.required,

          Validators.min(1)

        ]

      )

    });


  }







  valider(): void {



    if(this.form.invalid){


      this.form.markAllAsTouched();

      return;


    }



    const quantite = Number(

      this.form.value.quantite

    );



    this.dialogRef.close(quantite);



  }








  annuler(): void {


    this.dialogRef.close();


  }



}