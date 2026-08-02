import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit
} from '@angular/core';

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

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { Categorie } from '../../../core/services/categorie';
import { CategorieInterface } from '../../../interfaces/Categorie';
import { ProduitInterface } from '../../../interfaces/ProduitInterface';

@Component({
  selector: 'app-produit-dialog',
  standalone: true,
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
  styleUrl: './produit-dialog.css'
})
export class ProduitDialog implements OnInit {

  form!: FormGroup;

  categories: CategorieInterface[] = [];

  constructor(
    private fb: FormBuilder,
    private categorieService: Categorie,
    private dialogRef: MatDialogRef<ProduitDialog>,
    private cd: ChangeDetectorRef,

    @Inject(MAT_DIALOG_DATA)
    public data: ProduitInterface | null
  ) {}

  ngOnInit(): void {

    this.form = this.fb.group({

      code: ['', Validators.required],

      designation: ['', Validators.required],

      description: [''],

      prixAchat: [0, Validators.required],

      prixVente: [0, Validators.required],

      tva: [0],

      stockMinimum: [0, Validators.required],

      actif: [true],

      categorieId: [null, Validators.required]

    });

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

    setTimeout(() => {

      this.chargerCategories();

    });

  }

  chargerCategories(): void {

    this.categorieService.findAll()
      .subscribe({

        next: (response) => {

          this.categories = response.data;

          this.cd.detectChanges();

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

  enregistrer(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;

    }

    this.dialogRef.close(this.form.value);

  }

  fermer(): void {

    this.dialogRef.close();

  }

}