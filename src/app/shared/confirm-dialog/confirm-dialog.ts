import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';


@Component({

  selector: 'app-confirm-dialog',

  standalone: true,

  imports: [

    CommonModule,

    MatDialogModule,

    MatButtonModule

  ],

  templateUrl: './confirm-dialog.html',

  styleUrl: './confirm-dialog.css'

})
export class ConfirmDialog {



  constructor(

    private dialogRef: MatDialogRef<ConfirmDialog>,


    @Inject(MAT_DIALOG_DATA)

    public data: {

      title: string;

      message: string;

    }

  ) { }




  confirmer() {

    this.dialogRef.close(true);

  }




  annuler() {

    this.dialogRef.close(false);

  }



}