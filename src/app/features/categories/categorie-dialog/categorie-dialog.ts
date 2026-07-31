import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup
} from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CategorieInterface } from '../../../interfaces/Categorie';


@Component({
  selector: 'app-categorie-dialog',
  standalone: true,
  imports: [

    CommonModule,

    ReactiveFormsModule,

    MatDialogModule,

    MatFormFieldModule,

    MatInputModule,

    MatButtonModule,

    MatCheckboxModule

  ],
  templateUrl: './categorie-dialog.html',
  styleUrl: './categorie-dialog.css'
})
export class CategorieDialog {


  form!: FormGroup;



  constructor(

    private fb: FormBuilder,

    private dialogRef: MatDialogRef<CategorieDialog>,

    @Inject(MAT_DIALOG_DATA)
    public data: CategorieInterface | null

  ) {


    this.form = this.fb.group({

      code: [
        '',
        Validators.required
      ],

      libelle: [
        '',
        Validators.required
      ],

      description: [
        ''
      ],

      actif: [
        true
      ]

    });



    // Mode modification

    if (this.data) {


      this.form.patchValue({

        code: this.data.code,

        libelle: this.data.libelle,

        description: this.data.description,

        actif: this.data.actif

      });


    }


  }





  enregistrer(): void {


    if(this.form.invalid){


      this.form.markAllAsTouched();

      return;

    }



    this.dialogRef.close(

      this.form.value

    );


  }





  fermer(): void {


    this.dialogRef.close();


  }


}