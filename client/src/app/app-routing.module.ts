import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const layoutModule = () =>
  import('./modules/layout/layout.module').then((x) => x.LayoutModule);

const routes: Routes = [
  { path: '', loadChildren: layoutModule },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
