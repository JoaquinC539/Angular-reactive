import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'data', loadChildren: () => import('./data/data/data-module').then((m) => m.DataModule) },
  {
    path: 'catalog',
    loadChildren: () => import('./catalog/catalog/catalog-module').then((m) => m.CatalogModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
