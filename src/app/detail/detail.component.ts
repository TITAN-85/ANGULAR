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

	modifier() {
		let uneBiere: IBiere = this.form.value;
		this.bieroServ.modifierBiere(this.biere.id_biere, uneBiere).subscribe((retour) => {
			console.log(retour);
			this.biere.nom = uneBiere.nom;
			this.biere.brasserie = uneBiere.brasserie;
			this.biere.description = uneBiere.description;
		})
	}
}
