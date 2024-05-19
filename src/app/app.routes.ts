import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './error-routing/not-found/not-found.component';
import { UncaughtErrorComponent } from './error-routing/error/uncaught-error.component';

// Rotas do app
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { EditComponent } from './edit/edit.component';

export const routes: Routes = [
	{ path: '', redirectTo: '/decks', pathMatch: 'full'},
	{ path: 'decks', component: HomeComponent, data: { text: 'Visualizar Decks' }},
  { path: 'about', component: AboutComponent, data: { text: 'Sobre o app' } },
  { path: 'edit/:id', component: EditComponent},
	{ path: 'error', component: UncaughtErrorComponent },
	{ path: '**', component: PageNotFoundComponent } // must always be last
];
