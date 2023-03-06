import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {BieroService} from '../biero.service';
import {IBiere} from '../ibiere';
import {IProduit} from '../iproduit';

@Component({
	selector: 'app-liste',
	templateUrl: './liste.component.html',
	styleUrls: ['./liste.component.scss']
})
export class ListeComponent implements OnInit {
	produits: Array<IBiere>;
	sontEditable: boolean = false;
	estConnecte: boolean = false;

	constructor(private authServ: AuthService, private bieroServ: BieroService) {
		this.produits = [];
	}

	ngOnInit(): void {
		this.authServ.statutConnexion().subscribe((etat: boolean) => {
			this.estConnecte = etat;
			if (this.estConnecte === false) {
				this.sontEditable = false;
			}
		})
		this.authServ.setNomPage("Liste");
		this.getBieres();
	}

	estEnSolde(unProduit: IProduit) {
		return (unProduit.prix < 15 && unProduit.rabais);
	}

	verifEditable(unProduit: IProduit): boolean {
		let res: boolean = false;
		if (this.sontEditable || unProduit.estEditable) {
			res = true;
		}
		return res;
	}

	onModifier(id_biere: number):void {

	}

	onEffacer(id_biere: number):void {
		this.bieroServ.effacerBiere(id_biere).subscribe(() => {
			this.getBieres();
		});
	}

	getBieres():void {
		this.bieroServ.getBieres().subscribe((listeBiere) => {
			this.produits = listeBiere.data;
		});
	}

	onAjoute() {

	}
}
