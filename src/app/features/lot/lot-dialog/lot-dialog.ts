import {
  Component,
  Inject,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import {
  MatDatepickerModule
} from '@angular/material/datepicker';

import {
  MatNativeDateModule
} from '@angular/material/core';

import { Produit } from '../../../core/services/produit';
import { ProduitInterface } from '../../../interfaces/ProduitInterface';

@Component({
  selector: 'app-lot-dialog',
  standalone: true,
  templateUrl: './lot-dialog.html',
  styleUrl: './lot-dialog.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class LotDialog implements OnInit {

  form!: FormGroup;

  produits: ProduitInterface[] = [];

  constructor(

    private fb: FormBuilder,

    private produitService: Produit,

    private dialogRef: MatDialogRef<LotDialog>,

    private cd: ChangeDetectorRef,

    @Inject(MAT_DIALOG_DATA)
    public data: any

  ) {}

  ngOnInit(): void {

    this.form = this.fb.group({

      numeroLot: [
        this.data?.numeroLot ?? '',
        Validators.required
      ],

      produitCode: [
        this.data?.produitCode ?? '',
        Validators.required
      ],

      dateFabrication: [
        this.data?.dateFabrication
          ? new Date(this.data.dateFabrication)
          : null,
        Validators.required
      ],

      datePeremption: [
        this.data?.datePeremption
          ? new Date(this.data.datePeremption)
          : null,
        Validators.required
      ],

      quantiteInitiale: [
        this.data?.quantiteInitiale ?? 0,
        [
          Validators.required,
          Validators.min(0)
        ]
      ]

    });

    this.loadProduits();

  }

  loadProduits(): void {

    this.produitService.findAll().subscribe({

      next: (response) => {

        this.produits = response.data;

        this.cd.markForCheck();

      },

      error: (err) => {

        console.error(err);

      }

    });

  }

  save(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;

    }

    this.dialogRef.close(this.form.value);

  }

  cancel(): void {

    this.dialogRef.close();

  }

}