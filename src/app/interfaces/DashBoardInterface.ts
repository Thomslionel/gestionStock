import { StatistiqueMouvement } from "./StatistiqueMouvement";
import { StockInterface } from "./StockInterface";
import { MouvementStockInterface } from "./MouvementStockInterface";


export interface DashBoardInterface {


    nombreProduits:number;


    nombreCategories:number;


    nombreMouvements:number;


    nombreStocksFaibles:number;



    stocksFaibles:StockInterface[];



    derniersMouvements:MouvementStockInterface[];



    mouvementsParJour:StatistiqueMouvement[];


}