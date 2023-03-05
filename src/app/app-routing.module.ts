import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccueilComponent} from './accueil/accueil.component';
import {DetailComponent} from './detail/detail.component';
import {GardienLoginGuard} from './gardien-login.guard';
import {ListeComponent} from './liste/liste.component';
import {NonTrouveeComponent} from './non-trouvee/non-trouvee.component';

const routes: Routes = [
	{path: "", redirectTo: '/list', pathMatch: 'full'},
	{path: "accueil", component: AccueilComponent},
	{path: "list", component: ListeComponent},
	{path: "produit/:id", component: DetailComponent, canActivate: [GardienLoginGuard]},
	{path: "**", component: NonTrouveeComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
