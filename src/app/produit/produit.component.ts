import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from '../auth.service';
import {IBiere} from '../ibiere';
import {BieroService} from '../biero.service';

@Component({
	selector: 'app-produit',
	templateUrl: './produit.component.html',
	styleUrls: ['./produit.component.scss']
})

export class ProduitComponent implements OnInit {
	@Input() produit: IBiere;
	@Output() effacer = new EventEmitter<number>();
	@Output() modifier = new EventEmitter<number>();
	estConnecte: boolean = false;

	constructor(private authServ: AuthService, private bieroServ: BieroService) {
		this.authServ.statutConnexion().subscribe((etat) => {
			this.estConnecte = etat;
		})
	}

	ngOnInit(): void {
		// this.modifForm = new FormGroup({
		// 	nom: new FormControl(this.produit.nom, [Validators.required, Validators.minLength(2)]),
		// 	brasserie: new FormControl(this.produit.brasserie),
		// 	description: new FormControl(this.produit.description)
		// });
	}


	onModifier(id_biere: number):void {
		this.modifier.next(id_biere);
	}

	onEffacer(id_biere: number):void {
		this.effacer.next(id_biere);
	}
}
