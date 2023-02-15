import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { DetailComponent } from './detail/detail.component';
import { EnteteComponent } from './entete/entete.component';
import { ListeComponent } from './liste/liste.component';
import { NonTrouveeComponent } from './non-trouvee/non-trouvee.component';
import { ProduitComponent } from './produit/produit.component';

// import { AppRoutingModule } from './app-routing.module';

const routes: Routes = [
  {path : "", component:AccueilComponent},
  {path : "produit", component:ListeComponent},
  {path : "produit/:id", component:DetailComponent},
  {path : "**", component:NonTrouveeComponent},
  // {path : "/produit", component:ProduitComponent},
  // AppRoutingModule
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
