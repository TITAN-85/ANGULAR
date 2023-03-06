import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {BieroService} from '../biero.service';
import {IBiere} from '../ibiere';
import {FormControl, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.scss']
})
export class AjouterComponent implements OnInit {
	public biere: IBiere;
	public form: FormGroup;

	constructor(private authServ: AuthService,
				private route: ActivatedRoute,
				private router: Router,
				private bieroServ: BieroService) {
	}

	ngOnInit(): void {
		this.createForm();
		this.authServ.setNomPage("Détail du produit");
		this.route.params.subscribe((params) => {
			this.bieroServ.getUneBiere(params['id']).subscribe((biere: any) => {
				this.biere = biere['data'];
				// this.populateForm(this.biere);
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

	ajouter() {
		let nouvelleBiere: IBiere = this.form.value;
		console.log(nouvelleBiere)
		this.bieroServ.ajouterBiere(nouvelleBiere).subscribe((retour) => {
			console.log(retour);
			this.biere.nom = nouvelleBiere.nom;
			this.biere.brasserie = nouvelleBiere.brasserie;
			this.biere.description = nouvelleBiere.description;
		})
		this.router.navigate(['/list']);
	}
}
