export interface ProduitInterface {

    id?: number;

    code: string;

    designation: string;

    description?: string;

    prixAchat: number;

    prixVente: number;

    tva: number;

    stockMinimum: number;

    actif: boolean;

    categorieCode?: string;

    categorieLibelle?: string;

    categorieId: number;

}