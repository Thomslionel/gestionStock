import { StatistiqueMouvement } from "./StatistiqueMouvement";

export interface DashBoardInterface{

    nombreProduits:number;

    nombreCategories:number;

    nombreMouvements:number;

    nombreStocksFaibles:number;

    stocksFaibles:any[];

    derniersMouvements:any[];


    mouvementsParJour:StatistiqueMouvement[];

}