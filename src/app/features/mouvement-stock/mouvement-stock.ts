import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MouvementStockInterface } from '../../interfaces/MouvementStockInterface';
import { MouvementStockService } from '../../core/services/mouvement-stock';


@Component({
  selector: 'app-mouvement-stock',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './mouvement-stock.html',
  styleUrl: './mouvement-stock.css'
})
export class MouvementStock implements OnInit {



  mouvements: MouvementStockInterface[] = [];




  displayedColumns = [

    'date',

    'lot',

    'produit',

    'type',

    'quantite',

    'reference',

    'observation'

  ];






  constructor(

    private mouvementService: MouvementStockService,

    private cd: ChangeDetectorRef

  ) {}







  ngOnInit(): void {

    this.loadMouvements();

  }








  loadMouvements(): void {



    this.mouvementService.findAll()

      .subscribe({

        next:(response)=>{


          this.mouvements = response.data;


          this.cd.detectChanges();


        },


        error:(err)=>{


          console.error(err);


        }


      });



  }



}