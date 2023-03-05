import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../auth.service';
import {BieroService} from '../biero.service';
import {IBiere} from '../ibiere';
import {FormControl, FormGroup, Validators} from '@angular/forms'

@Component({
	selector: 'app-detail',
	templateUrl: './detail.component.html',
	styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

	public biere: IBiere;
	public form: FormGroup;

	constructor(private authServ: AuthService,
				private route: ActivatedRoute,
				private bieroServ: BieroService) {
	}

	ngOnInit(): void {
		this.createForm();
		this.authServ.setNomPage("Détail du produit");
		this.route.params.subscribe((params) => {
			this.bieroServ.getUneBiere(params['id']).subscribe((biere: any) => {
				this.biere = biere['data'];
				this.populateForm(this.biere);
			})
		})
	}

	public createForm(): void {
		this.form = new FormGroup({
			nom: 			new FormControl(undefined, [
				Validators.required,
				Validators.minLength(2),
				Validators.max(50)
			]),
			brasserie : 	new FormControl(undefined,[
				Validators.minLength(2),
				Validators.max(50)
			]),
			description : 	new FormControl(undefined, [
				Validators.minLength(10),
				Validators.max(500),
			])
		});
	}

	public populateForm(biere: IBiere): void {
		if (biere) {
			this.form.get('nom')?.setValue(biere.nom);
			this.form.get('brasserie')?.setValue(biere.brasserie);
			this.form.get('description')?.setValue(biere.description);
		}
	}

	// modifier() {
		// let unProduit: IBiere = this.modifForm.value;
		// console.log(unProduit);
		// this.bieroServ.modifierBiere(this.produit.id_biere, unProduit).subscribe((retour) => {
		// 	console.log(retour);
		// 	this.peutEditer = false;
		// 	this.produit.nom = unProduit.nom;
		// 	this.produit.brasserie = unProduit.brasserie;
		// 	this.produit.description = unProduit.description;
		// });
	// }

	// annuler() {
	// 	console.log(this.modifForm);
	// 	this.modifForm.controls["nom"].setValue(this.produit.nom);
	// 	this.modifForm.controls["brasserie"].setValue(this.produit.brasserie);
	// 	this.modifForm.controls["description"].setValue(this.produit.description);
	// }
	modifier() {
		console.log('Form Submited: ', this.form)
		const formData = {...this.form.value}
		console.log(formData)
	}
}
