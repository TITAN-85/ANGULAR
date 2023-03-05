import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { BieroService } from '../biero.service';
import { IBiere } from '../ibiere';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import { IProduit } from '../iproduit';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit{
  	biere:IBiere;
	modifForm:FormGroup;
	@Input() produit:IBiere;
	@Output() peutEditerChange = new EventEmitter<boolean>();
	@Input() peutEditer:boolean;




	constructor(private authServ:AuthService,
              private route:ActivatedRoute,
              private bieroServ:BieroService){ }

  ngOnInit(): void {
    this.authServ.setNomPage("Détail du produit");

    this.route.params.subscribe((params)=>{
      this.bieroServ.getUneBiere(params['id']).subscribe((biere:any)=>{
        this.biere = biere.data;
      })
    })
	  this.modifForm = new FormGroup({
		  nom: new FormControl(this.produit.nom, [Validators.required, Validators.minLength(2)]),
		  brasserie : new FormControl(this.produit.brasserie),
		  description : new FormControl(this.produit.description)
	  });
  }

	changeEditable(){
		this.peutEditer = true;
		this.peutEditerChange.emit(this.peutEditer);
	}

	modifier(){
		let unProduit:IBiere = this.modifForm.value;
		console.log(unProduit);
		this.bieroServ.modifierBiere(this.produit.id_biere, unProduit).subscribe((retour)=>{
			console.log(retour);
			this.peutEditer = false;
			this.produit.nom = unProduit.nom;
			this.produit.brasserie = unProduit.brasserie;
			this.produit.description = unProduit.description;
		});
	}

	annuler(){
		console.log(this.modifForm);
		this.modifForm.controls["nom"].setValue(this.produit.nom);
		this.modifForm.controls["brasserie"].setValue(this.produit.brasserie);
		this.modifForm.controls["description"].setValue(this.produit.description);
	}
}
