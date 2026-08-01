

export interface MouvementStockInterface {


    id:number;


    dateMouvement:string;


    type:
    | 'ENTREE'
    | 'SORTIE'
    | 'INVENTAIRE'
    | 'AJUSTEMENT'
    | 'RETOUR_CLIENT'
    | 'RETOUR_FOURNISSEUR'
    | 'CASSE'
    | 'TRANSFERT';



    quantite:number;


    reference:string;


    observation:string;


    produitCode:string;


    produitDesignation:string;


    


}