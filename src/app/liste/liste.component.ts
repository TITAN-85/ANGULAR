import { Component } from '@angular/core';
import { IProduit } from '../iproduit';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})
export class ListeComponent {

  // produits:Array<Object>;
  // produits:Object[];

  produits: Array<IProduit>;

  constructor() {

    /* 1 solution */
    this.produits = [...Array(5)].map((item, index) => {
      return {
        nom: " element" + index,
        fabricant: " brasserie xyz",
        prix: (10 + index * 2),
        id: index,
        rabais: !(index % 3)
      }
      console.log(this.produits);
      
    });
  }
  estEnSold(unProduit:IProduit) {
    // let solde = false;
    // if(unProduit.prix < 15 && unProduit.rabais);
    // solde = true;
    // return solde;

    return (unProduit.prix < 15 && unProduit.rabais);

  }

}
