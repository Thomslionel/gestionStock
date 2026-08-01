import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';

import { Chart } from 'chart.js/auto';

import { DashboardService } from '../../core/services/dashboard-service';
import { DashBoardInterface } from '../../interfaces/DashBoardInterface';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {


  dashboard: DashBoardInterface | null = null;



  stockColumns = [
    'designation',
    'quantite'
  ];



  mouvementColumns = [
    'date',
    'produit',
    'type',
    'quantite'
  ];



  chart?: Chart;



  constructor(
    private dashboardService: DashboardService
  ){}



  ngOnInit(): void {

    this.loadDashboard();

  }





  loadDashboard(){


    this.dashboardService.getDashboard()
      .subscribe({


        next:(response:any)=>{


          this.dashboard = response.data;


          this.createChart();


        },



        error:(err)=>{


          console.error(
            "Erreur chargement dashboard",
            err
          );


        }


      });


  }







  createChart(){


    // Protection si les données ne sont pas encore chargées

    if(
      !this.dashboard ||
      !this.dashboard.mouvementsParJour ||
      this.dashboard.mouvementsParJour.length === 0
    ){

      return;

    }



    const mouvements =
      this.dashboard.mouvementsParJour;




    // Détruire l'ancien graphique
    // évite les doublons si le dashboard est rechargé

    if(this.chart){

      this.chart.destroy();

    }





    this.chart = new Chart(
      'mouvementChart',
      {


        type:'bar',



        data:{


          labels:mouvements.map(
            m => m.jour
          ),



          datasets:[


            {

              label:'Entrées',

              data:mouvements.map(
                m => m.entrees
              )


            },



            {

              label:'Sorties',

              data:mouvements.map(
                m => m.sorties
              )


            }


          ]


        },




        options:{


          responsive:true,


          maintainAspectRatio:false,



          plugins:{


            legend:{


              position:'top'


            }


          }


        }


      }

    );


  }


}